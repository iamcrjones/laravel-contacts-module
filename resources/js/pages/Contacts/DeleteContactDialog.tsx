import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { deleteContact } from "@/lib/api";

interface DeleteContactDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    contact: Contact | null;
    onContactDeleted: () => void;
}

const DeleteContactDialog: React.FC<DeleteContactDialogProps> = ({
    isOpen,
    onOpenChange,
    contact,
    onContactDeleted,
}) => {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleDelete = async () => {
        if (!contact?.id) return;

        setIsDeleting(true);
        setError(null);
        try {
            await deleteContact(contact.id);
            onContactDeleted();
            onOpenChange(false);
        } catch (err: any) {
            console.error("Failed to delete contact:", err.message);
            setError(
                err.message || "Failed to delete contact. Please try again.",
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the contact{" "}
                        <span className="font-bold">{contact?.name}</span> (ID:{" "}
                        {contact?.id}) from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" disabled={isDeleting}>
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteContactDialog;
