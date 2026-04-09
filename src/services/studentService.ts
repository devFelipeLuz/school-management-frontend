export interface Student {
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

function getAuthHeaders() {
    const token = localStorage.getItem("accessToken");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

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

    const response = await fetch(
        `http://localhost:8080/students?${params.toString()}`, 
    {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error when searching for student");
    }

    const data = await response.json();
    
    return data.content;
}

export async function deactivateStudent(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Erro ao desativar estudante");
    }
}

export async function activateStudent(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/activate`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Erro ao ativar estudante");
    }
}