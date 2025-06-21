<?php

namespace Modules\Contacts\Console\Commands;

use Illuminate\Console\Command;
use Modules\Contacts\Models\Contact;

class ContactReadCommand extends Command
{
    protected $signature = 'contacts:read {identifier}';

    protected $description = 'Read and display a single contact by phone number or ID.';

    public function handle()
    {
        $identifier = $this->argument('identifier');

        try {
            $contact = Contact::find($identifier);

            if (! $contact) {
                $contact = Contact::where('phone_number', $identifier)->first();
            }

            if (! $contact) {
                $this->error("Contact with identifier '{$identifier}' not found.");

                return Command::FAILURE;
            }

            $this->info('Contact Details:');
            $this->table(
                ['Attribute', 'Value'],
                [
                    ['ID', $contact->id],
                    ['Name', $contact->name],
                    ['Phone Number', $contact->phone_number],
                    ['Email', $contact->email],
                    ['Created At', $contact->created_at],
                    ['Updated At', $contact->updated_at],
                ]
            );

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Error reading contact: '.$e->getMessage());

            return Command::FAILURE;
        }
    }
}
