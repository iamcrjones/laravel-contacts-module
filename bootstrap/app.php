<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Modules\Contacts\Console\Commands\ContactDeleteCommand;
use Modules\Contacts\Console\Commands\ContactReadCommand;
use Modules\Contacts\Console\Commands\ContactUpsertCommand;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withCommands([ContactUpsertCommand::class, ContactDeleteCommand::class, ContactReadCommand::class])
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
