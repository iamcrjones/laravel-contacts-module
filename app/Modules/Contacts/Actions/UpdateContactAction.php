<?php

namespace Modules\Contacts\Actions;

use Modules\Contacts\DataTransferObjects\ContactDto;
use Modules\Contacts\Models\Contact;

class UpdateContactAction
{
    public function __invoke(ContactDto $dto): Contact
    {
        $contact = Contact::where('email', $dto->email);

        return $contact->update($dto->toArray());
    }
}
