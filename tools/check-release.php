<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$metadata = json_decode(file_get_contents($root.'/composer.json'), true, 512, JSON_THROW_ON_ERROR);
if (isset($metadata['version']) || $metadata['name'] !== 'amrachraf6699/laravel-storm') {
    throw new RuntimeException('Invalid release metadata.');
}
foreach (['dist/storm.js', 'dist/storm.css', 'LICENSE', 'README.md', 'THIRD_PARTY_NOTICES.md'] as $required) {
    if (! is_file($root.'/'.$required)) {
        throw new RuntimeException('Missing release artifact: '.$required);
    }
}
$private = 'LARAVEL_STORM_TECHNICAL_SPECIFICATION.md';
$process = proc_open(['git', 'ls-files', '--', $private], [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $root);
if (! is_resource($process)) {
    throw new RuntimeException('Cannot inspect Git index.');
}
$tracked = stream_get_contents($pipes[1]);
fclose($pipes[1]);
fclose($pipes[2]);
if (proc_close($process) !== 0 || trim($tracked) !== '') {
    throw new RuntimeException('Private specification must remain untracked.');
}
if (isset($argv[1])) {
    $zip = new ZipArchive;
    if ($zip->open($argv[1]) !== true) {
        throw new RuntimeException('Cannot inspect release archive.');
    }
    for ($index = 0; $index < $zip->numFiles; $index++) {
        $name = $zip->getNameIndex($index);
        if (str_contains($name, $private) || preg_match('~(^|/)(\.env|vendor|node_modules|storm\.sqlite)(/|$)~', $name)) {
            throw new RuntimeException('Forbidden file in release archive.');
        }
    }
    $zip->close();
}
echo "Release metadata, assets and private-file checks passed.\n";
