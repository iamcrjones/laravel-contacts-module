<?php

namespace Modules\Contacts\Actions;

use Modules\Contacts\DataTransferObjects\ContactDto;
use Modules\Contacts\Models\Contact;

class UpdateContactAction
{
    public function __invoke(Contact $contact, ContactDto $dto): Contact // <--- Accept Contact model here
    {
        $contact->update($dto->toArray());

        $contact->refresh();

        return $contact;
    }
}
