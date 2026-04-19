import { getAuthHeaders } from "../utils/auth";

export interface Assignment {
    id: string;
    professorName: string;
    subjectName: string;
    classroomName: string;
}

interface AssignmentFilter {
    professorName?: string;
    subjectName?: string;
    classroomName?: string;
}

export const BASE_URL = "http://localhost:8080/assignments";

export async function getAssignments(filters?: AssignmentFilter) {
    const params = new URLSearchParams();

    if (filters?.professorName) {
        params.append("professorName", filters.professorName);
    }

    if (filters?.subjectName) {
        params.append("subjectName", filters.subjectName);
    }

    if (filters?.classroomName) {
        params.append("classroomName", filters.classroomName);
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for assignment");
    }

    const data = await response.json();

    return data.content;
}

export async function createAssignment(professorId: string, subjectId: string, classroomId: string) {
    const createData = { professorId, subjectId, classroomId };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function deleteAssignment(assignmentId: string) {
    const response = await fetch(`${BASE_URL}/${assignmentId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when deactivating professor");
    }
}