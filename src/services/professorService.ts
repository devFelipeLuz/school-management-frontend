import { getAuthHeaders } from "../utils/auth";

export interface Professor {
    id: string;
    name: string;
    email: string;
    active: boolean;
}

interface ProfessorFilter {
    name?: string;
    email?: string;
    active?: boolean;
}

export const BASE_URL = "http://localhost:8080/professors";

export async function getProfessors(filters?: ProfessorFilter) {
    const params = new URLSearchParams();

    if (filters?.name) {
        params.append("name", filters.name);
    }

    if (filters?.email) {
        params.append("email", filters.email);
    }

    if (filters?.active !== undefined) {
        params.append("active", String(filters.active));
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for professor");
    }

    const data = await response.json();

    return data.content;
}

export async function createProfessor(name: string, email: string, password: string) {
    const createData = { name, email, password };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateProfessor(name: string, email: string, password: string, id: string) {
    const updateData = { name, email, password };

    return await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function activateProfessor(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating professor");
    }
}

export async function deactivateProfessor(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating professor");
    }
}