<?php

namespace AmrAchraf\LaravelStorm\Data;

final readonly class EngineCapabilities
{
    public function __construct(public string $name, public bool $available, public array $modes, public ?string $version = null, public ?string $reason = null) {}

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
