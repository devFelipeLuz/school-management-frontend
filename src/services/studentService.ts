export interface Student {
    id: number;
    name: string;
    email: string;
    classroom: string;
    active: boolean;
}

const BASE_URL = "http://localhost:8080/students";

function getAuthHeaders() {
    const token = localStorage.getItem("accessToken");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

export async function getStudents() {
    const response = await fetch(BASE_URL, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar estudantes");
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