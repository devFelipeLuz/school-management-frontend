import { getAuthHeaders } from "../utils/auth";

export interface Students {
    id: string;
    name: string;
    email: string;
    classroom: string;
    active: boolean;
}

interface StudentFilters {
    name?: string;
    email?: string;
    active?: boolean;
}

const BASE_URL = "http://localhost:8080/students";

export async function getStudents(filters?: StudentFilters) {
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
        throw new Error("Error when searching for student");
    }

    const data = await response.json();

    return data.content;
}

export async function createStudent(name: string, email: string, password: string) {
    const createData = { name, email, password };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateStudent(name: string, email: string, password: string, studentId: string) {
    const updateData = { name, email, password };

    return await fetch(`${BASE_URL}/${studentId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function deactivateStudent(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating student");
    }
}

export async function activateStudent(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating student");
    }
}