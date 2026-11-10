<?php

namespace AmrAchraf\LaravelStorm\Engines;

/** Keep request JSON encoding identical to Guzzle's default encoding. */
final class StoreJson
{
    public static function encode(array $value): string
    {
        return json_encode($value, JSON_THROW_ON_ERROR);
    }
}
