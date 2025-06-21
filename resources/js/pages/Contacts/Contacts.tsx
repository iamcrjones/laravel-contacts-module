import React, { useState, useEffect, useCallback } from "react";
import { Contact } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { fetchContacts } from "@/lib/api";
import { getContactColumns } from "./table/columns";
import CreateContactDialog from "./CreateContactDialog";
import { DataTable } from "./table/data-table";
import EditContactDialog from "./EditContactDialog";
import DeleteContactDialog from "./DeleteContactDialog";
import CallContactDialog from "./CallContactDialog";

const ContactListPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State for dialogs
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); // NEW STATE
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(
        null,
    );

    // Function to load contacts
    const loadContacts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchContacts();
            setContacts(data);
        } catch (err: any) {
            console.error("Error loading contacts:", err.message);
            setError("Failed to load contacts. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    const handleEditClick = (contact: Contact) => {
        setSelectedContact(contact);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (contact: Contact) => {
        setSelectedContact(contact);
        setIsDeleteDialogOpen(true);
    };

    const handleCallClick = (contact: Contact) => {
        setSelectedContact(contact);
        setIsCallDialogOpen(true);
    };

    const handleCreateNewContactClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleOperationCompleted = (status?: string) => {
        loadContacts();
    };

    const columns = getContactColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
        onCall: handleCallClick,
    });

    if (loading) {
        return <div className="text-center py-8">Loading contacts...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Contact Management
            </h1>
            <div className="flex justify-end mb-4">
                <Button onClick={handleCreateNewContactClick}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Contact
                </Button>
            </div>
            <DataTable columns={columns} data={contacts} />

            <CreateContactDialog
                isOpen={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onContactCreated={handleOperationCompleted}
            />

            {selectedContact && (
                <>
                    <EditContactDialog
                        isOpen={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                        contact={selectedContact}
                        onContactUpdated={handleOperationCompleted}
                    />
                    <DeleteContactDialog
                        isOpen={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        contact={selectedContact}
                        onContactDeleted={handleOperationCompleted}
                    />
                    <CallContactDialog
                        isOpen={isCallDialogOpen}
                        onOpenChange={setIsCallDialogOpen}
                        contact={selectedContact}
                    />
                </>
            )}
        </div>
    );
};

export default ContactListPage;
