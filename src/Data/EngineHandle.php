<?php

namespace AmrAchraf\LaravelStorm\Data;

final readonly class EngineHandle
{
    public function __construct(public string $runId, public string $nonce, public string $directory) {}
}
