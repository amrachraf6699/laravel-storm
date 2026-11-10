<?php

namespace AmrAchraf\LaravelStorm\Data;

enum RunStatus: string
{
    case Pending = 'pending';
    case Starting = 'starting';
    case Running = 'running';
    case Stopping = 'stopping';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Failed = 'failed';

    public function terminal(): bool
    {
        return in_array($this, [self::Completed, self::Cancelled, self::Failed], true);
    }

    public function canTransitionTo(self $next): bool
    {
        return in_array($next, match ($this) {
            self::Pending => [self::Starting, self::Cancelled, self::Failed],
            self::Starting => [self::Running, self::Stopping, self::Failed],
            self::Running => [self::Stopping, self::Completed, self::Failed],
            self::Stopping => [self::Cancelled, self::Failed],
            default => [],
        }, true);
    }
}
