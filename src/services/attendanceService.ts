import { getAuthHeaders } from "../utils/auth";

export interface AttendanceRecord {
    id: string;
    studentName: string;
    status: string;
    date: Date;
}

export interface AttendanceSession {
    id: string;
    professor: string;
    subject: string;
    classroom: string;
    date: Date;
    students: AttendanceRecord[];
}

interface AttendanceFilters {
    studentName?: string;
    studentEmail?: string;
    status?: string;
}

export const BASE_URL = "http://localhost:8080/attendance";

export async function getAttendances(filters?: AttendanceFilters) {
    const params = new URLSearchParams();

    if (filters?.studentName) {
        params.append("studentName", filters.studentName);
    }

    if (filters?.studentEmail) {
        params.append("studentEmail", filters.studentEmail);
    }

    if (filters?.status) {
        params.append("status", filters.status);
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

export async function createAttendance(
    teachingAssignmentId: string,
    data: string,
    enrollmentId: string,
    status: string) {

    const createData = { teachingAssignmentId, data, enrollmentId, status };

    return await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(createData)
    });
}

export async function updateAttendance(
    sessionId: string,
    recordId: string,
    status: string) {

    const updateData = { status };

    return await fetch(`${BASE_URL}/${sessionId}/records/${recordId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    });
}

export async function deleteAttendance(sessionId: string) {
    return await fetch(`${BASE_URL}/${sessionId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
}
