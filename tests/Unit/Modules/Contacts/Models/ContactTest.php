<?php

namespace Tests\Unit\Modules\Contacts\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Contacts\Models\Contact;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a contact can be created in the database.
     * This also implicitly tests the mass assignment protection (fillable).
     *
     * @return void
     */
    public function test_contact_can_be_created()
    {
        // Define the data for the new contact
        $contactData = [
            'name' => 'John Doe',
            'phone_number' => '+61400123456',
            'email' => 'john.doe@example.com',
        ];

        $contact = Contact::create($contactData);

        $this->assertNotNull($contact);
        $this->assertInstanceOf(Contact::class, $contact);

        $this->assertDatabaseHas('contacts', $contactData);

        $this->assertEquals($contactData['name'], $contact->name);
        $this->assertEquals($contactData['phone_number'], $contact->phone_number);
        $this->assertEquals($contactData['email'], $contact->email);
    }

    /**
     * Test that a contact can be retrieved from the database.
     *
     * @return void
     */
    public function test_contact_can_be_retrieved()
    {
        $contact = Contact::create([
            'name' => 'Jane Smith',
            'phone_number' => '+64211234567',
            'email' => 'jane.smith@test.org',
        ]);

        $foundContact = Contact::find($contact->id);

        $this->assertNotNull($foundContact);
        $this->assertInstanceOf(Contact::class, $foundContact);

        $this->assertEquals($contact->name, $foundContact->name);
        $this->assertEquals($contact->phone_number, $foundContact->phone_number);
        $this->assertEquals($contact->email, $foundContact->email);
    }

    /**
     * Test that a contact can be updated in the database.
     *
     * @return void
     */
    public function test_contact_can_be_updated()
    {
        $contact = Contact::create([
            'name' => 'Old Name',
            'phone_number' => '+61400000000',
            'email' => 'old.email@example.com',
        ]);

        $newData = [
            'name' => 'New Name',
            'phone_number' => '+61499999999',
            'email' => 'new.email@updated.com',
        ];

        $contact->update($newData);

        $updatedContact = $contact->fresh();

        $this->assertEquals($newData['name'], $updatedContact->name);
        $this->assertEquals($newData['phone_number'], $updatedContact->phone_number);
        $this->assertEquals($newData['email'], $updatedContact->email);

        $this->assertDatabaseHas('contacts', $newData);
        $this->assertDatabaseMissing('contacts', [
            'name' => 'Old Name',
            'phone_number' => '+61400000000',
        ]);
    }

    /**
     * Test that a contact can be deleted from the database.
     *
     * @return void
     */
    public function test_contact_can_be_deleted()
    {
        $contact = Contact::create([
            'name' => 'Contact to Delete',
            'phone_number' => '+64210000000',
            'email' => 'delete.me@example.net',
        ]);

        $this->assertDatabaseHas('contacts', ['id' => $contact->id]);

        $contact->delete();

        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
        $this->assertNull(Contact::find($contact->id));
    }

    /**
     * Test that fillable attributes work correctly (mass assignment protection).
     *
     * @return void
     */
    public function test_contact_fillable_attributes()
    {
        $contact = Contact::create([
            'name' => 'Fillable Test',
            'phone_number' => '+61411222333',
            'email' => 'fillable@example.com',
            'unfillable_attribute' => 'this should not be set',
        ]);

        $this->assertArrayNotHasKey('unfillable_attribute', $contact->toArray());

        $this->assertDatabaseHas('contacts', [
            'name' => 'Fillable Test',
            'phone_number' => '+61411222333',
            'email' => 'fillable@example.com',
        ]);
        $this->assertDatabaseMissing('contacts', ['unfillable_attribute' => 'this should not be set']);
    }

    /**
     * Test unique constraint on phone_number.
     *
     * @return void
     */
    public function test_unique_phone_number_constraint()
    {
        Contact::create([
            'name' => 'Contact One',
            'phone_number' => '+61412345678',
            'email' => 'one@example.com',
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);
        Contact::create([
            'name' => 'Contact Two',
            'phone_number' => '+61412345678',
            'email' => 'two@example.com',
        ]);
    }

    /**
     * Test unique constraint on email.
     *
     * @return void
     */
    public function test_unique_email_constraint()
    {
        Contact::create([
            'name' => 'Contact Alpha',
            'phone_number' => '+61400000001',
            'email' => 'alpha@example.com',
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);
        Contact::create([
            'name' => 'Contact Beta',
            'phone_number' => '+61400000002',
            'email' => 'alpha@example.com',
        ]);
    }
}
