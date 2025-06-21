<?php

use Illuminate\Support\Facades\Route;
use Modules\Contacts\Http\Controllers\ContactsController;

Route::prefix('contacts')->group(function () {
    Route::get('/', [ContactsController::class, 'index']);
    Route::post('/', [ContactsController::class, 'store']);
    Route::get('/{contact}', [ContactsController::class, 'show']);
    Route::put('/{contact}', [ContactsController::class, 'update']);
    Route::delete('/{contact}', [ContactsController::class, 'destroy']);
    Route::post('/{contact}/call', [ContactsController::class, 'call']);
});
