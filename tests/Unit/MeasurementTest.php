<?php

namespace AmrAchraf\LaravelStorm\Tests\Unit;

use AmrAchraf\LaravelStorm\Data\RunStatus;
use AmrAchraf\LaravelStorm\Metrics\Aggregator;
use AmrAchraf\LaravelStorm\Metrics\Histogram;
use AmrAchraf\LaravelStorm\Metrics\Thresholds;
use AmrAchraf\LaravelStorm\Reports\Reports;
use PHPUnit\Framework\TestCase;

final class MeasurementTest extends TestCase
{
    public function test_histogram_matches_reference_and_merges_observations(): void
    {
        $first = new Histogram;
        $second = new Histogram;
        $values = [];
        for ($i = 1; $i <= 10000; $i++) {
            $value = $i / 10;
            $values[] = $value;
            ($i % 2 ? $first : $second)->add($value);
        }
        $first->merge(Histogram::decode($second->encode()));
        foreach ([50, 95, 99] as $percentile) {
            $exact = $values[(int) ceil(count($values) * $percentile / 100) - 1];
            $observed = $first->percentile($percentile);
            self::assertGreaterThanOrEqual($exact, $observed);
            self::assertLessThanOrEqual($exact * 1.01 + .001, $observed);
        }
        self::assertEquals(500.05, $first->summary()['mean_ms']);
        self::assertNull((new Histogram)->percentile(95));
    }

    public function test_failure_denominators_and_thresholds_are_separate(): void
    {
        $metrics = new Aggregator;
        $metrics->observe(['status_code' => 200, 'duration_ms' => 10, 'expected' => true]);
        $metrics->observe(['status_code' => 500, 'duration_ms' => 20, 'expected' => false]);
        $metrics->observe(['status_code' => null, 'duration_ms' => 50, 'error_type' => 'timeout']);
        $summary = $metrics->summary(2);
        self::assertSame(3, $summary['completed_requests']);
        self::assertSame(2, $summary['http_responses']);
        self::assertSame(.5, $summary['http_error_rate']);
        self::assertEquals(1 / 3, $summary['transport_error_rate']);
        self::assertSame(1, $summary['timeouts']);
        $result = (new Thresholds)->evaluate([['metric' => 'http_error_rate', 'value' => .01, 'operator' => 'lt']], $summary);
        self::assertSame('failed', $result['performance_outcome']);
        self::assertSame('not_evaluated', (new Thresholds)->evaluate([], $summary)['performance_outcome']);
    }

    public function test_lifecycle_rejects_terminal_reentry_and_reports_escape_html(): void
    {
        self::assertTrue(RunStatus::Running->canTransitionTo(RunStatus::Completed));
        self::assertFalse(RunStatus::Completed->canTransitionTo(RunStatus::Running));
        self::assertTrue(RunStatus::Cancelled->terminal());
        $html = (new Reports)->html(['name' => '<script>alert(1)</script>']);
        self::assertStringNotContainsString('<script>', $html);
        self::assertStringContainsString('&lt;script&gt;', $html);
    }
}
