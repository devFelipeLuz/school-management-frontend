import { getAuthHeaders } from "../utils/auth";

export interface Assessment {
    id: string;
    title: string;
    subject: string;
    type: string;
    professorName: string;
    classroom: string;
    date: Date;
    active: boolean;
}

interface AssessmentFilters {
    title?: string;
    type?: string;
    active?: boolean;
}

export const BASE_URL = "http://localhost:8080/assessments";

export async function getAssessments(filters?: AssessmentFilters) {
    const params = new URLSearchParams();

    if (filters?.title) {
        params.append("title", filters.title);
    }

    if (filters?.type) {
        params.append("type", filters.type);
    }

    if (filters?.active != undefined) {
        params.append("active", String(filters.active));
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for assessment");
    }

    const data = await response.json();

    return data.content;
}

export async function createAssessment(title: string, type: string, teachingAssignmentId: string) {

    const createData = { title, type, teachingAssignmentId };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateAssessment(title: string, type: string, assessmentId: string) {
    const updateData = { title, type };

    return await fetch(`${BASE_URL}/${assessmentId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function activateAssessment(assessmentId: string) {
    const response = await fetch(`${BASE_URL}/${assessmentId}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Error when activating assessment");
    }
}

export async function deactivateAssessment(assessmentId: string) {
    const response = await fetch(`${BASE_URL}/${assessmentId}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Error when deactivating assessment");
    }
}