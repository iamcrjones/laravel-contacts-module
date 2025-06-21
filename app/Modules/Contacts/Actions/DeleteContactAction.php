<?php

namespace Modules\Contacts\Actions;

use Modules\Contacts\Models\Contact;

class DeleteContactAction
{
    public function __invoke(Contact $contact)
    {
        return $contact->delete();
    }
}
