<?php

namespace Modules\Contacts\DataTransferObjects;

use Illuminate\Support\Arr;

class ContactDto
{
    public function __construct(
        public string $name,
        public string $phone_number,
        public string $email
    ) {}

    /**
     * Create a DTO instance from an array of data (e.g., request data).
     */
    public static function fromArray(array $data): static
    {
        // Ensure required keys exist and provide default values or throw exceptions if not.
        // Using Arr::get for safety
        return new static(
            Arr::get($data, 'name'),
            Arr::get($data, 'phone_number'),
            Arr::get($data, 'email')
        );
    }

    /**
     * Convert the DTO instance to an array.
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
        ];
    }
}
