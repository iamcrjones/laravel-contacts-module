<?php

namespace Modules\Contacts\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactUpsertRequest extends FormRequest
{
    // Return true as auth is not needed.
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ];
    }
}
