<?php

$settings = require __DIR__.'/../../config/storm.php';
$settings['enabled'] = true;
$settings['storage_path'] = storage_path('storm');

return $settings;
