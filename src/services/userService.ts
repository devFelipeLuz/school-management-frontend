import { getAuthHeaders } from "../utils/auth";

export interface User {
    id: string;
    email: string;
    createdAt: Date;
    role: string;
    enabled: boolean;
}

interface UserFilters {
    email?: string;
    role?: string;
    enabled?: boolean;
}

export const BASE_URL = "http://localhost:8080/admin/users";

export async function getUsers(filters?: UserFilters) {
    const params = new URLSearchParams();

    if (filters?.email) {
        params.append("email", filters.email);
    }

    if (filters?.role) {
        params.append("role", filters.role);
    }

    if (filters?.enabled !== undefined) {
        params.append("enabled", String(filters.enabled));
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for user");
    }

    const data = await response.json();

    return data.content;
}

export async function createUser(email: string, password: string, role: string) {
    const createData = { email, password, role };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateUser(email: string, password: string, role: string, userId: string) {
    const updateData = { email, password, role };

    return await fetch(`${BASE_URL}/${userId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function deactivateUser(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating user");
    }
}

export async function activateUser(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating user");
    }
}