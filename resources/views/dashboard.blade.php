<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel Storm</title>
    <link rel="stylesheet" href="{{ route('storm.asset', ['file' => 'storm.css']) }}">
</head>
<body>
    <div id="storm" data-base="{{ url(config('storm.path', 'storm')) }}"></div>
    <script type="module" src="{{ route('storm.asset', ['file' => 'storm.js']) }}"></script>
</body>
</html>
