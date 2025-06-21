<?php

namespace Modules\Contacts\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

final class Contact extends Model
{
    use HasTimestamps;

    protected $fillable = [
        'name',
        'phone_number',
        'email',
    ];
}
