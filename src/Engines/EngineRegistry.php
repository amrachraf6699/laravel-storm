<?php

namespace AmrAchraf\LaravelStorm\Engines;

use AmrAchraf\LaravelStorm\Contracts\LoadEngine;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use InvalidArgumentException;

final class EngineRegistry
{
    private array $instances = [];

    public function __construct(private array $settings, private TargetPolicy $targets) {}

    public function get(string $name): LoadEngine
    {
        return $this->instances[$name] ??= match ($name) {
            'php' => new PhpEngine($this->targets),
            'k6' => new K6Engine($this->settings, $this->targets),
            default => throw new InvalidArgumentException('Unknown engine.'),
        };
    }

    public function capabilities(): array
    {
        return array_map(fn ($name) => $this->get($name)->capabilities()->toArray(), ['php', 'k6']);
    }
}
