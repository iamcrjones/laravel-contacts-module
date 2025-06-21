import { Contact } from "./types";

const API_BASE_URL = "/api";

export interface ContactCreateUpdatePayload {
    name: string;
    phone_number: string;
    email: string;
}

export const fetchContacts = async (): Promise<Contact[]> => {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
        throw new Error(`Error fetching contacts: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
};

export const createContact = async (
    payload: ContactCreateUpdatePayload,
): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create contact");
    }
    return (await response.json()).data;
};
export const updateContact = async (
    id: number,
    payload: ContactCreateUpdatePayload,
): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "PUT", // Use PUT method for updates
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update contact");
    }
    return (await response.json()).data;
};

export const deleteContact = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        if (response.status === 204) {
            return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete contact");
    }
};

export const simulateCall = async (
    id: number,
): Promise<{
    message: string;
    status: string;
}> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}/call`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to simulate call");
    }
    return await response.json();
};
