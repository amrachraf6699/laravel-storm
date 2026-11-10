<?php

namespace AmrAchraf\LaravelStorm\Data;

final readonly class RunConfiguration
{
    public function __construct(public array $data) {}

    public function engine(): string
    {
        return $this->data['engine'];
    }

    public function duration(): float
    {
        return $this->data['workload']['duration'];
    }

    public function toArray(): array
    {
        return $this->data;
    }
}
