<?php

namespace AmrAchraf\LaravelStorm\Diagnostics;

final class QueryScope
{
    public int $count = 0;

    public float $milliseconds = 0;

    public function query(float $milliseconds): void
    {
        $this->count++;
        $this->milliseconds += max(0, $milliseconds);
    }
}
