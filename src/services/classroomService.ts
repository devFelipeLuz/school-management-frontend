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

export async function getClassrooms(filters?: ClassroomFilters) {
    const params = new URLSearchParams();

    if (filters?.name) {
        params.append("name", filters.name);
    }

    if (filters?.active !== undefined) {
        params.append("active", String(filters.active));
    }

    const response = await fetch(
        `http://localhost:8080/classrooms?${params.toString()}`,
        {
            headers: getAuthHeaders()
        });

    if (!response.ok) {
        throw new Error("Error when searching for classrooms");
    }

    const data = await response.json();

    return data.content;
}

export async function deactivateClassroom(id: string) {
    const response = await fetch(`http://localhost:8080/classrooms/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating student");
    }
}

export async function activateClassroom(id: string) {
    const response = await fetch(`http://localhost:8080/classrooms/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating student");
    }
}