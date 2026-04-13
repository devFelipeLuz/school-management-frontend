import { getAuthHeaders } from "../utils/auth";

export interface Subject {
    id: string;
    name: string;
    active: boolean
}

interface SubjectFilter {
    name?: string;
    active?: boolean;
}

export const BASE_URL = "http://localhost:8080/subjects";

export async function getSubjects(filters?: SubjectFilter) {
    const params = new URLSearchParams();

    if (filters?.name) {
        params.append("name", filters.name);
    }

    if (filters?.active !== undefined) {
        params.append("active", String(filters.active));
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (response.ok) {
        throw new Error("Error when searching for subject");
    }

    const data = await response.json();

    return data.content;
}

export async function createSubject(name: string) {
    const createData = { name };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateSubject(name: string, id: string) {
    const updateData = { name };

    return await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function activateSubject(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating professor");
    }
}

export async function deactivateSubject(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating professor");
    }
}