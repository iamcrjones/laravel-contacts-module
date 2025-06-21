<?php

namespace Modules\Contacts\Console\Commands;

use Illuminate\Console\Command;
use Modules\Contacts\Actions\CreateContactAction;
use Modules\Contacts\Actions\UpdateContactAction;
use Modules\Contacts\DataTransferObjects\ContactDto;
use Modules\Contacts\Models\Contact;

class ContactUpsertCommand extends Command
{
    protected $signature = 'contacts:upsert {name} {phone_number} {email}';

    protected $description = 'Upsert a contact via CLI.';

    public function handle(
        CreateContactAction $createAction,
        UpdateContactAction $updateAction,
    ) {
        $dto = new ContactDto(
            $this->argument('name'),
            $this->argument('phone_number'),
            $this->argument('email')
        );

        try {
            $contact = Contact::where('phone_number', $dto->phone_number)->first();

            if ($contact) {
                $updatedContact = $updateAction($contact, $dto);
                $this->info("Contact {$updatedContact->name} updated successfully!");
            } else {
                $newContact = $createAction($dto);
                $this->info("Contact {$newContact->name} created successfully!");
            }
        } catch (\Exception $e) {
            $this->error('Error upserting contact: '.$e->getMessage());
        }
    }
}
