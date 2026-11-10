<?php

namespace AmrAchraf\LaravelStorm\Scenarios;

use AmrAchraf\LaravelStorm\Security\Redactor;
use Psr\Http\Message\ResponseInterface;
use RuntimeException;
use Symfony\Component\DomCrawler\Crawler;

final class Journey
{
    public function __construct(private array $environment, private Redactor $redactor)
    {
        foreach ($environment as $value) {
            $redactor->registerSecret((string) $value);
        }
    }

    public function interpolate(mixed $value, array $variables, bool $encode = false): mixed
    {
        if (is_array($value)) {
            return array_map(fn ($item) => $this->interpolate($item, $variables, $encode), $value);
        }
        if (! is_string($value)) {
            return $value;
        }

        return preg_replace_callback('/\{\{(env\.[A-Z_][A-Z0-9_]*|[A-Za-z][A-Za-z0-9_]*)\}\}/', function ($m) use ($variables, $encode) {
            $source = str_starts_with($m[1], 'env.') ? $this->environment : $variables;
            $key = str_starts_with($m[1], 'env.') ? substr($m[1], 4) : $m[1];
            if (! array_key_exists($key, $source) || ! is_scalar($source[$key])) {
                throw new RuntimeException('A referenced journey variable is missing.');
            }
            $result = (string) $source[$key];

            return $encode ? rawurlencode($result) : $result;
        }, $value);
    }

    public function extract(array $rules, ResponseInterface $response, string $body): array
    {
        $variables = [];
        foreach ($rules as $name => $rule) {
            $value = match ($rule['source']) {
                'header' => $response->getHeaderLine($rule['path']),
                'json' => $this->jsonValue($body, $rule['path']),
                'css' => $this->cssValue($body, $rule),
                default => throw new RuntimeException('Unsupported extraction source.'),
            };
            if (! is_scalar($value) || strlen((string) $value) > 16384 || $value === '') {
                throw new RuntimeException('Response extraction failed or exceeded its size limit.');
            }
            $variables[$name] = (string) $value;
        }

        return $variables;
    }

    private function jsonValue(string $body, string $path): mixed
    {
        $result = json_decode($body, true);
        foreach (explode('.', $path) as $key) {
            if (! is_array($result) || ! array_key_exists($key, $result)) {
                return null;
            }
            $result = $result[$key];
        }

        return $result;
    }

    private function cssValue(string $body, array $rule): ?string
    {
        $selection = (new Crawler($body))->filter($rule['path']);
        if ($selection->count() === 0) {
            return null;
        }

        return isset($rule['attribute']) ? $selection->first()->attr($rule['attribute']) : $selection->first()->text();
    }
}
