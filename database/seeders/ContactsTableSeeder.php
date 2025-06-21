<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Contacts\Models\Contact;

class ContactsTableSeeder extends Seeder
{
    public function run(): void
    {
        $contactsData = [
            [
                'name' => 'Alice Johnson',
                'phone_number' => '+61412345678', // Australian mobile
                'email' => 'alice.johnson@example.com',
            ],
            [
                'name' => 'Bob Williams',
                'phone_number' => '+64219876543', // New Zealand mobile
                'email' => 'bob.williams@company.net',
            ],
            [
                'name' => 'Charlie Brown',
                'phone_number' => '+61298765432', // Australian landline (Sydney)
                'email' => 'charlie@domain.org',
            ],
        ];

        foreach ($contactsData as $data) {
            Contact::create($data);
            $this->command->info("Created contact: {$data['name']}");
        }

        $this->command->info('3 contacts seeded successfully!');
    }
}
