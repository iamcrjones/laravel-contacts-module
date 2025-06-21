<?php

namespace Modules\Contacts\Actions;

use Modules\Contacts\DataTransferObjects\ContactDto;
use Modules\Contacts\Models\Contact;

class CreateContactAction
{
    public function __invoke(ContactDto $dto): Contact
    {
        return Contact::create($dto->toArray());
    }
}
