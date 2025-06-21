import react, { useEffect, useState } from "react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
export default function Contacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const req = await fetch("api/contacts");
            const res = await req.json();
            setContacts(res.data);
        };
        fetchContacts();
    }, []);
    console.log(contacts);
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={contacts} />
        </div>
    );
}
