<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Laravel Storm · Sign in</title>
<style>body{background:#0c1118;color:#e1e8ef;font:16px system-ui;display:grid;place-items:center;min-height:95vh}main{width:min(440px,85vw);border:1px solid #27333d;border-radius:18px;padding:35px}h1{color:#6de6c6}p{line-height:1.6;color:#a6b4c4}input,button{box-sizing:border-box;width:100%;padding:14px;margin-top:12px;border-radius:8px;border:1px solid #405260;background:#141e28;color:white}button{background:#6de6c6;color:#10221e;font-weight:700;cursor:pointer}label{display:block;margin-top:24px}code{color:#6de6c6}</style></head>
<body><main><h1>ϟ Laravel Storm</h1><p>Controlled load. Clear signals.</p>
@if($local)
<p>Run <code>php artisan storm:login</code> in your application, then enter the single-use token below. It expires in five minutes.</p>
<form method="post" action="{{ route('storm.authenticate') }}">@csrf<label for="token">Local access token</label><input id="token" name="token" type="password" required minlength="64" maxlength="64" autocomplete="off"><button type="submit">Open Storm</button></form>
@else
<p>Sign in through your application's login page. Your account also needs permission through the <code>viewStorm</code> gate.</p>
@endif
</main></body></html>
