import { getAuthHeaders } from "../utils/auth";

export interface Classroom {
    id: string;
    name: string;
    enrollmentCountForSchoolYear: number;
    maxCapacity: number;
    schoolYear: number;
    active: boolean;
}

interface ClassroomFilters {
    name?: string;
    active?: boolean;
}

export const BASE_URL = "http://localhost:8080/classrooms";

export async function getClassrooms(filters?: ClassroomFilters) {
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

    if (!response.ok) {
        throw new Error("Error when searching for classrooms");
    }

    const data = await response.json();

    return data.content;
}

export async function createClassroom(name: string, schoolYearId: string) {
    const createData = { name, schoolYearId };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateClassroom(name: string, newCapacity: number, id: string) {
    const updateData = { name, newCapacity }

    return await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function deactivateClassroom(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating student");
    }
}

export async function activateClassroom(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating student");
    }
}