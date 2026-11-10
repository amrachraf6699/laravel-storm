<?php

namespace AmrAchraf\LaravelStorm\Engines;

use AmrAchraf\LaravelStorm\Contracts\LoadEngine;
use AmrAchraf\LaravelStorm\Data\EngineCapabilities;
use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Diagnostics\SignedContext;
use AmrAchraf\LaravelStorm\Runs\RunContext;
use AmrAchraf\LaravelStorm\Scenarios\Journey;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\TransferException;
use GuzzleHttp\Handler\CurlMultiHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Promise\Utils;
use GuzzleHttp\TransferStats;
use Psr\Http\Message\ResponseInterface;
use RuntimeException;

final class PhpEngine implements LoadEngine
{
    public function __construct(private TargetPolicy $targets) {}

    public function capabilities(): EngineCapabilities
    {
        return new EngineCapabilities('php', extension_loaded('curl'), ['fixed-vus', 'ramping-vus', 'spike'], PHP_VERSION);
    }

    public function execute(RunConfiguration $configuration, RunContext $context): void
    {
        $config = $configuration->data;
        $target = $this->targets->approve($config['origin']);
        $multi = new CurlMultiHandler(['select_timeout' => .01]);
        $client = new Client(['handler' => HandlerStack::create($multi), 'http_errors' => false, 'allow_redirects' => false, 'proxy' => '', 'verify' => true]);
        $journey = new Journey($context->environment, $context->redactor);
        $users = [];
        $promises = [];
        $nextStart = 0.0;
        $drainingAt = null;
        $fatal = null;
        while (true) {
            $elapsed = $context->elapsed();
            $stop = $context->shouldStop();
            $draining = $stop || $elapsed >= $configuration->duration();
            if ($draining && $drainingAt === null) {
                $drainingAt = $elapsed;
            }
            if ($stop) {
                foreach ($promises as $promise) {
                    $promise->cancel();
                }
                break;
            }
            $desired = $this->desiredUsers($config['workload'], $elapsed);
            $context->gauge('active_vus', $draining ? 0 : $desired);
            $context->gauge('in_flight', count($promises));
            for ($vu = 1; $vu <= $desired && ! $draining; $vu++) {
                $users[$vu] ??= ['step' => 0, 'variables' => [], 'cookies' => new CookieJar, 'ready' => 0.0, 'busy' => false];
                if ($users[$vu]['busy'] || $users[$vu]['ready'] > $elapsed || $elapsed < $nextStart) {
                    continue;
                }
                $stepIndex = $users[$vu]['step'];
                $step = $config['steps'][$stepIndex];
                $variables = $users[$vu]['variables'];
                $path = $journey->interpolate($step['path'], $variables, true);
                $options = ['headers' => $journey->interpolate($step['headers'] ?? [], $variables), 'cookies' => $users[$vu]['cookies'], 'timeout' => $step['timeout'], 'connect_timeout' => min(5, $step['timeout']), 'curl' => [CURLOPT_RESOLVE => [$target['host'].':'.$target['port'].':'.(str_contains($target['ip'], ':') ? '['.$target['ip'].']' : $target['ip'])], CURLOPT_NOPROGRESS => false, CURLOPT_XFERINFOFUNCTION => function ($handle, $downloadTotal, $downloaded) use ($context): int {
                    return $downloadTotal > $context->settings['security']['max_response_bytes'] || $downloaded > $context->settings['security']['max_response_bytes'] ? 1 : 0;
                }]];
                if (isset($step['json'])) {
                    $options['json'] = $journey->interpolate($step['json'], $variables);
                }
                if (isset($step['form'])) {
                    $options['form_params'] = $journey->interpolate($step['form'], $variables);
                }
                $traceId = bin2hex(random_bytes(8));
                if ($config['diagnostics'] && ($context->settings['diagnostics']['key'] ?? null) && random_int(1, 1000000) <= $context->settings['diagnostics']['sample_rate'] * 1000000) {
                    $options['headers']['X-Storm-Context'] = SignedContext::issue($context->id, $traceId, $context->settings['diagnostics']['key']);
                }
                $transfer = new TransferTiming;
                $options['on_stats'] = function (TransferStats $stats) use ($transfer) {
                    $raw = $stats->getHandlerStats();
                    $transfer->timings = ['duration_ms' => $stats->getTransferTime() * 1000, 'connect_ms' => ($raw['connect_time'] ?? 0) * 1000, 'ttfb_ms' => ($raw['starttransfer_time'] ?? 0) * 1000];
                };
                $users[$vu]['busy'] = true;
                $context->startedRequest();
                $nextStart = max($elapsed, $nextStart) + 1 / $config['workload']['rps_limit'];
                $began = hrtime(true);
                $requestBody = isset($options['json']) ? StoreJson::encode($options['json']) : http_build_query($options['form_params'] ?? []);
                $promise = $client->requestAsync($step['method'], $target['origin'].$path, $options);
                $promises[$vu] = $promise;
                $promise->then(function (ResponseInterface $response) use (&$users, &$promises, $vu, $step, $config, $context, $journey, $transfer, $began, $traceId, $requestBody) {
                    $timings = $transfer->timings;
                    $body = (string) $response->getBody();
                    $event = ['method' => $step['method'], 'endpoint' => explode('?', $step['path'])[0], 'step' => $step['name'], 'virtual_user' => $vu, 'trace_id' => $traceId, 'status_code' => $response->getStatusCode(), 'expected' => in_array($response->getStatusCode(), $step['expected_status'], true), 'duration_ms' => $timings['duration_ms'] ?? (hrtime(true) - $began) / 1e6, 'timings' => $timings, 'response_bytes' => strlen($body), 'headers' => $context->redactor->headers($response->getHeaders())];
                    try {
                        $users[$vu]['variables'] = array_replace($users[$vu]['variables'], $journey->extract($step['extract'] ?? [], $response, $body));
                    } catch (\Throwable) {
                        $event['expected'] = false;
                        $event['extraction_failed'] = true;
                        $users[$vu]['step'] = count($config['steps']) - 1;
                    }
                    $captureRedactor = clone $context->redactor;
                    foreach ($users[$vu]['variables'] as $variable) {
                        $captureRedactor->registerSecret((string) $variable);
                    }
                    $event['headers'] = $captureRedactor->headers($response->getHeaders());
                    $capture = $config['capture'] && ! isset($event['extraction_failed']);
                    $event['request_body'] = $captureRedactor->body($requestBody, isset($step['json']) ? 'application/json' : 'application/x-www-form-urlencoded', $capture);
                    $event['response_body'] = $captureRedactor->body($body, $response->getHeaderLine('Content-Type'), $capture);
                    $context->observe($event);
                    $this->advance($users[$vu], $config, $step, $context->elapsed());
                    unset($promises[$vu]);
                }, function ($error) use (&$users, &$promises, $vu, $step, $config, $context, $began) {
                    $handler = $error instanceof TransferException && method_exists($error, 'getHandlerContext') ? $error->getHandlerContext() : [];
                    $context->observe(['method' => $step['method'], 'endpoint' => explode('?', $step['path'])[0], 'step' => $step['name'], 'virtual_user' => $vu, 'status_code' => null, 'duration_ms' => (hrtime(true) - $began) / 1e6, 'error_type' => ($handler['errno'] ?? null) === CURLE_OPERATION_TIMEDOUT ? 'timeout' : 'transport']);
                    $users[$vu]['step'] = count($config['steps']) - 1;
                    $this->advance($users[$vu], $config, $step, $context->elapsed());
                    unset($promises[$vu]);
                })->otherwise(function ($error) use (&$fatal) {
                    $fatal = $error;
                });
            }
            $multi->tick();
            Utils::queue()->run();
            if ($fatal !== null) {
                throw $fatal;
            }
            if ($draining && $promises === []) {
                break;
            }
            if ($drainingAt !== null && $elapsed - $drainingAt > 61) {
                throw new RuntimeException('Request drain deadline exceeded.');
            }
            usleep(1000);
        }
    }

    private function advance(array &$user, array $config, array $step, float $elapsed): void
    {
        $user['step']++;
        if ($user['step'] >= count($config['steps'])) {
            $user['step'] = 0;
            $user['variables'] = [];
            $user['cookies'] = new CookieJar;
        }
        $user['ready'] = $elapsed + $step['think_time'];
        $user['busy'] = false;
    }

    public function desiredUsers(array $load, float $elapsed): int
    {
        if (! isset($load['stages'])) {
            return $load['vus'];
        }
        $start = 0;
        $previous = $load['vus'];
        foreach ($load['stages'] as $stage) {
            if ($elapsed < $start + $stage['duration']) {
                return max(0, (int) round($previous + ($stage['target'] - $previous) * (($elapsed - $start) / $stage['duration'])));
            }
            $previous = $stage['target'];
            $start += $stage['duration'];
        }

        return 0;
    }
}
