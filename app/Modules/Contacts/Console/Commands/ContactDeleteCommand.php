<?php

namespace Modules\Contacts\Console\Commands;

use Illuminate\Console\Command;
use Modules\Contacts\Actions\DeleteContactAction;
use Modules\Contacts\Models\Contact;

class ContactDeleteCommand extends Command
{
    protected $signature = 'contacts:delete {identifier}';

    protected $description = 'Delete a contact by phone number or ID.';

    public function handle(DeleteContactAction $deleteAction)
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

            $contactName = $contact->name;

            $deleteAction($contact);

            $this->info("Contact '{$contactName}' (ID: {$contact->id}) deleted successfully!");

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Error deleting contact: '.$e->getMessage());

            return Command::FAILURE;
        }
    }
}
