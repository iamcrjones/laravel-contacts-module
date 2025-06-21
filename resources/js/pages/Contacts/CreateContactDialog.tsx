import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactCreateUpdatePayload, createContact } from "@/lib/api";

interface CreateContactDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onContactCreated: () => void;
}

const CreateContactDialog: React.FC<CreateContactDialogProps> = ({
    isOpen,
    onOpenChange,
    onContactCreated,
}) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
        {},
    );
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setName("");
            setPhoneNumber("");
            setEmail("");
            setFormErrors({}); // Clear errors
            setServerError(null);
        }
    }, [isOpen]);

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (!name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
        } else if (name.trim().length > 255) {
            errors.name = "Name cannot exceed 255 characters.";
            isValid = false;
        }

        if (!phoneNumber.trim()) {
            errors.phone_number = "Phone number is required.";
            isValid = false;
        } else {
            const e164Regex = /^\+[1-9]\d{1,14}$/;
            if (!e164Regex.test(phoneNumber.trim())) {
                errors.phone_number =
                    "Invalid E164 format (e.g., +61412345678).";
                isValid = false;
            } else if (
                !phoneNumber.startsWith("+61") &&
                !phoneNumber.startsWith("+64")
            ) {
                errors.phone_number =
                    "Must be an Australian (+61) or New Zealand (+64) number.";
                isValid = false;
            }
        }

        if (!email.trim()) {
            errors.email = "Email is required.";
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                errors.email = "Invalid email address.";
                isValid = false;
            } else if (email.trim().length > 255) {
                errors.email = "Email cannot exceed 255 characters.";
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setServerError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const payload: ContactCreateUpdatePayload = {
                name: name.trim(),
                phone_number: phoneNumber.trim(),
                email: email.trim(),
            };
            await createContact(payload);
            onContactCreated();
            onOpenChange(false);
        } catch (error: any) {
            console.error("Failed to create contact:", error.message);
            setServerError(error.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Contact</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new contact.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                        {formErrors.name && (
                            <p className="col-span-4 text-right text-sm text-red-500">
                                {formErrors.name}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone_number" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="col-span-3"
                        />
                        {formErrors.phone_number && (
                            <p className="col-span-4 text-right text-sm text-red-500">
                                {formErrors.phone_number}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                        />
                        {formErrors.email && (
                            <p className="col-span-4 text-right text-sm text-red-500">
                                {formErrors.email}
                            </p>
                        )}
                    </div>
                    {serverError && (
                        <p className="text-red-500 text-sm col-span-4 text-center">
                            {serverError}
                        </p>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Contact"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateContactDialog;
