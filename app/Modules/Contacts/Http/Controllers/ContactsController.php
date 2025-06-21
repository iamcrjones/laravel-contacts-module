<?php

namespace Modules\Contacts\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Contacts\Actions\CallContactAction;
use Modules\Contacts\Actions\CreateContactAction;
use Modules\Contacts\Actions\DeleteContactAction;
use Modules\Contacts\Actions\UpdateContactAction;
use Modules\Contacts\DataTransferObjects\ContactDto;
use Modules\Contacts\Http\Requests\ContactUpsertRequest;
use Modules\Contacts\Http\Resources\ContactResource;
use Modules\Contacts\Models\Contact;

class ContactsController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();

        return ContactResource::collection($contacts);
    }

    public function store(ContactUpsertRequest $request)
    {
        $dto = ContactDto::fromArray($request->validated());
        $contact = new CreateContactAction($dto);

        return new ContactResource($contact);
    }

    public function show(Contact $contact)
    {
        return new ContactResource($contact);
    }

    public function update(ContactUpsertRequest $request, Contact $contact)
    {
        $dto = ContactDto::fromArray($request->validated());
        $contact = new UpdateContactAction($dto);

        return new ContactResource($contact);
    }

    public function destroy(Contact $contact)
    {
        new DeleteContactAction($contact);

        return response()->noContent();
    }

    public function call(Contact $contact)
    {
        $result = new CallContactAction($contact);

        return response()->json(['message' => 'Call simulated', 'status' => $result]);
    }
}
