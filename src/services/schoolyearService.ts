import { getAuthHeaders } from "../utils/auth";

export interface Schoolyears {
    id: string;
    year: number;
    startDate: Date;
    active: boolean;
}

interface SchoolyearFilter {
    year?: string;
    active?: boolean;
}

export const BASE_URL = "http://localhost:8080/school-years";

export async function getSchoolyears(filter?: SchoolyearFilter) {
    const params = new URLSearchParams();

    if (filter?.year) {
        params.append("year", String(filter.year));
    }

    if (filter?.active !== undefined) {
        params.append("active", String(filter.active));
    }

    const response = await fetch(
        `http://localhost:8080/school-years?${params.toString()}`,
        {
            headers: getAuthHeaders()
        });

    if (!response.ok) {
        throw new Error("Error when searching for School Year");
    }

    const data = await response.json();

    return data.content;
}

export async function createSchoolyear(year: string) {

    const createData = { year };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateSchoolyear(year: string, schoolyearId: string) {

    const updateData = { year };

    return await fetch(`${BASE_URL}/${schoolyearId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function deactivateSchoolyear(id: string) {
    const response = await fetch(
        `http://localhost:8080/school-years/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating schoolyear");
    }
}

export async function activateSchoolyear(id: string) {
    const response = await fetch(
        `http://localhost:8080/school-years/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating schoolyear");
    }
}