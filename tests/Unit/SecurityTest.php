<?php

namespace AmrAchraf\LaravelStorm\Tests\Unit;

use AmrAchraf\LaravelStorm\Diagnostics\SignedContext;
use AmrAchraf\LaravelStorm\Scenarios\Journey;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Security\Redactor;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use AmrAchraf\LaravelStorm\Tests\Support\Settings;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class SecurityTest extends TestCase
{
    public function test_capture_is_opt_in_allowlisted_bounded_and_redacted(): void
    {
        $redactor = new Redactor(['enabled' => true, 'fields' => ['public', 'password'], 'max_bytes' => 100, 'headers' => ['content-type', 'authorization']]);
        $redactor->registerSecret('known-secret');
        self::assertSame(['public' => '[REDACTED]'], $redactor->body('{"public":"known-secret","password":"hidden","email":"private"}', 'application/json', true));
        self::assertNull($redactor->body('{}', 'application/json', false));
        self::assertNull($redactor->body('abc', 'application/octet-stream', true));
        self::assertSame(['omitted' => 'body exceeds capture limit'], $redactor->body(str_repeat('a', 101), 'application/json', true));
        self::assertSame(['content-type' => 'application/json'], $redactor->headers(['Authorization' => 'Bearer hidden', 'Content-Type' => 'application/json']));
    }

    public function test_signed_context_rejects_tampering_expiry_and_weak_keys(): void
    {
        $key = str_repeat('a', 64);
        $token = SignedContext::issue(str_repeat('b', 32), 'trace_12345', $key);
        self::assertSame('trace_12345', SignedContext::verify($token, $key)['trace_id']);
        self::assertNull(SignedContext::verify($token.'0', $key));
        self::assertNull(SignedContext::verify($token, 'short'));
        $encoded = rtrim(strtr(base64_encode(json_encode(['run_id' => str_repeat('b', 32), 'trace_id' => 'trace_12345', 'expires' => time() - 1])), '+/', '-_'), '=');
        self::assertNull(SignedContext::verify($encoded.'.'.hash_hmac('sha256', $encoded, $key), $key));
    }

    public function test_journey_extracts_json_headers_html_and_encodes_path_variables(): void
    {
        $redactor = new Redactor;
        $journey = new Journey(['PASSWORD' => 'fixture-secret'], $redactor);
        self::assertSame('/items/a%2Fb', $journey->interpolate('/items/{{id}}', ['id' => 'a/b'], true));
        self::assertSame('fixture-secret', $journey->interpolate('{{env.PASSWORD}}', []));
        self::assertSame(['id' => '12'], $journey->extract(['id' => ['source' => 'json', 'path' => 'item.id']], new Response, '{"item":{"id":12}}'));
        self::assertSame(['csrf' => 'abc'], $journey->extract(['csrf' => ['source' => 'css', 'path' => 'input[name="_token"]', 'attribute' => 'value']], new Response, '<input name="_token" value="abc">'));
        self::assertSame(['token' => 'abc'], $journey->extract(['token' => ['source' => 'header', 'path' => 'X-Token']], new Response(200, ['X-Token' => 'abc']), ''));
    }

    public static function unsafeScenarios(): array
    {
        return [[['origin' => 'file:///etc/passwd']], [['origin' => 'http://169.254.169.254']], [['steps' => [['path' => '//evil.test']]]], [['steps' => [['path' => '/x', 'headers' => ['Host' => 'evil.test']]]]], [['steps' => [['path' => '/x', 'json' => ['password' => 'literal-secret']]]]], [['workload' => ['vus' => 101]]], [['workload' => ['duration' => '100h']]], [['engine' => 'php', 'workload' => ['mode' => 'constant-arrival-rate']]]];
    }

    #[DataProvider('unsafeScenarios')]
    public function test_rejects_unsafe_or_unsupported_scenarios(array $overrides): void
    {
        $settings = Settings::make('unused');
        $validator = new ScenarioValidator($settings['security'], new TargetPolicy($settings['security']));
        $scenario = array_replace(Settings::scenario(), $overrides);
        $this->expectException(\InvalidArgumentException::class);
        $validator->validate($scenario);
    }

    public function test_private_and_metadata_ips_require_explicit_policy(): void
    {
        $settings = Settings::make('unused')['security'];
        $settings['allowed_origins'] = ['http://10.0.0.1:8000', 'http://169.254.169.254'];
        try {
            (new TargetPolicy($settings))->approve('http://10.0.0.1:8000');
            self::fail('Private target was accepted.');
        } catch (\InvalidArgumentException) {
            $settings['allowed_private_origins'] = ['http://10.0.0.1:8000', 'http://169.254.169.254'];
        }
        self::assertSame('10.0.0.1', (new TargetPolicy($settings))->approve('http://10.0.0.1:8000')['ip']);
        $this->expectException(\InvalidArgumentException::class);
        (new TargetPolicy($settings))->approve('http://169.254.169.254');
    }
}
