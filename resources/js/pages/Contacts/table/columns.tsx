import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface ContactColumnsProps {
    onEdit: (contact: Contact) => void;
    onDelete: (contact: Contact) => void;
    onCall: (contact: Contact) => void;
}

export const getContactColumns = ({
    onEdit,
    onDelete,
    onCall,
}: ContactColumnsProps): ColumnDef<Contact>[] => {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <Link
                    to={`/contacts/${row.original.id}`}
                    className="font-medium text-blue-600 hover:underline"
                >
                    {row.original.name}
                </Link>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone_number",
            header: "Phone",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const contact = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onCall(contact)}>
                                Call
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(contact)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(contact)}
                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
