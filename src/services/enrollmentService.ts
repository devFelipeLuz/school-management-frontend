import { getAuthHeaders } from "../utils/auth";

export interface Enrollments {
    id: string;
    studentName: string;
    schoolYear: number;
    classroomName: string;
    enrolledAt: Date;
    status: string;
}

interface EnrollmentFilters {
    studentName?: string;
    status?: string;
}

const BASE_URL = "http://localhost:8080/enrollments"

export async function getEnrollments(filters?: EnrollmentFilters) {
    const params = new URLSearchParams();

    if (filters?.studentName) {
        params.append("studentName", filters.studentName);
    }

    if (filters?.status) {
        params.append("status", filters.status);
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for enrollment");
    }

    const data = await response.json();

    return data.content;
}

export async function finishEnrollment(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/finish`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating enrollment");
    }
}

export async function cancelEnrollment(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/cancel`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating enrollment");
    }
}

export async function activateEnrollment(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when activating enrollment");
    }
}