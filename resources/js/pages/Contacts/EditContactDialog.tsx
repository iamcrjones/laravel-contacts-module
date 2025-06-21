import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Contact, ContactCreateUpdatePayload } from "@/lib/types"; // Assuming types
import { updateContact } from "@/lib/api";

interface EditContactDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    contact: Contact | null; // The contact to be edited
    onContactUpdated: () => void; // Callback after successful update
}

// Zod schema for form validation
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }).max(255),
    phone_number: z
        .string()
        .min(1, { message: "Phone number is required." })
        .regex(
            /^\+[1-9]\d{1,14}$/,
            "Invalid E164 phone number format (e.g., +61412345678)",
        )
        .refine(
            (val) => val.startsWith("+61") || val.startsWith("+64"),
            "Phone number must be an Australian (+61) or New Zealand (+64) number.",
        ),
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("Invalid email address."),
});

const EditContactDialog: React.FC<EditContactDialogProps> = ({
    isOpen,
    onOpenChange,
    contact,
    onContactUpdated,
}) => {
    const form = useForm<ContactCreateUpdatePayload>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone_number: "",
            email: "",
        },
    });

    // Populate form fields when the dialog opens or contact changes
    useEffect(() => {
        if (isOpen && contact) {
            form.reset({
                name: contact.name,
                phone_number: contact.phone_number,
                email: contact.email,
            });
        }
    }, [isOpen, contact, form]);

    const onSubmit = async (values: ContactCreateUpdatePayload) => {
        if (!contact?.id) return; // Should not happen if contact is valid

        try {
            await updateContact(contact.id, values);
            onContactUpdated(); // Notify parent of update
            onOpenChange(false); // Close dialog
            form.reset(); // Reset form after successful submission
        } catch (error: any) {
            console.error("Failed to update contact:", error.message);
            // You might want to display an error message to the user
            form.setError("root.serverError", {
                type: "manual",
                message: error.message || "An unexpected error occurred.",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogDescription>
                        Make changes to this contact here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            {...field}
                                            className="col-span-3"
                                        />
                                    </FormControl>
                                    <FormMessage className="col-span-4 text-right" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone_number"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel
                                        htmlFor="phone_number"
                                        className="text-right"
                                    >
                                        Phone
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="phone_number"
                                            {...field}
                                            className="col-span-3"
                                        />
                                    </FormControl>
                                    <FormMessage className="col-span-4 text-right" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            {...field}
                                            className="col-span-3"
                                        />
                                    </FormControl>
                                    <FormMessage className="col-span-4 text-right" />
                                </FormItem>
                            )}
                        />
                        {form.formState.errors.root?.serverError && (
                            <p className="text-red-500 text-sm col-span-4 text-center">
                                {form.formState.errors.root.serverError.message}
                            </p>
                        )}
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Saving..."
                                    : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditContactDialog;
