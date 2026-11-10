<?php

namespace AmrAchraf\LaravelStorm\Metrics;

final class Histogram
{
    private array $bins = [];

    private int $count = 0;

    private float $sum = 0;

    public function add(float $ms): void
    {
        // Resolution: 1 microsecond near zero, 1% logarithmic buckets above it.
        $value = max(0, $ms);
        $key = $value < .001 ? 0 : 1 + (int) floor(log($value / .001) / log(1.01));
        $this->bins[$key] = ($this->bins[$key] ?? 0) + 1;
        $this->count++;
        $this->sum += $value;
    }

    public function merge(self $other): void
    {
        foreach ($other->bins as $key => $count) {
            $this->bins[$key] = ($this->bins[$key] ?? 0) + $count;
        }
        $this->count += $other->count;
        $this->sum += $other->sum;
    }

    public function percentile(float $percentile): ?float
    {
        if ($this->count === 0) {
            return null;
        }
        ksort($this->bins, SORT_NUMERIC);
        $rank = max(1, (int) ceil($this->count * $percentile / 100));
        $seen = 0;
        foreach ($this->bins as $key => $count) {
            $seen += $count;
            if ($seen >= $rank) {
                return $key === 0 ? .001 : .001 * (1.01 ** $key);
            }
        }

        return null;
    }

    public function summary(): array
    {
        return ['count' => $this->count, 'mean_ms' => $this->count ? $this->sum / $this->count : null, 'p50_ms' => $this->percentile(50), 'p95_ms' => $this->percentile(95), 'p99_ms' => $this->percentile(99), 'estimation' => 'logarithmic histogram; upper bucket bound; <=1% + 0.001ms error'];
    }

    public function encode(): array
    {
        return ['bins' => $this->bins, 'count' => $this->count, 'sum' => $this->sum];
    }

    public static function decode(array $data): self
    {
        $histogram = new self;
        $histogram->bins = $data['bins'];
        $histogram->count = $data['count'];
        $histogram->sum = $data['sum'];

        return $histogram;
    }
}
