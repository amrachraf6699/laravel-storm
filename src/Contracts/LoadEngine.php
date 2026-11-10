<?php

namespace AmrAchraf\LaravelStorm\Contracts;

use AmrAchraf\LaravelStorm\Data\EngineCapabilities;
use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Runs\RunContext;

interface LoadEngine
{
    public function capabilities(): EngineCapabilities;

    /** Runs exclusively inside an independently supervised CLI worker. */
    public function execute(RunConfiguration $configuration, RunContext $context): void;
}
