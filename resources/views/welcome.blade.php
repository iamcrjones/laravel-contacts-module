<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CRM App</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/main.tsx']) {{-- Point to your main TypeScript React entry --}}
    </head>
    <body class="antialiased">
        <div id="app"></div> {{-- This is where your React app will mount --}}
    </body>
</html>
