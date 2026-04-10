import { useEffect, useState } from "react";
import {
    getStudents,
    deactivateStudent,
    activateStudent
} from "../services/studentService";
import { getAuthHeaders } from "../utils/auth";

export interface Students {
    id: string;
    name: string;
    email: string;
    classroom: string;
    active: boolean;
}

export function useStudents() {
    const [students, setStudents] = useState<Students[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [nameFilter, setNamefilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const postEndpoint = "http://localhost:8080/students";

    const fetchStudents = async () => {
        try {
            const data = await getStudents({
                name: debouncedName || undefined,
                email: debouncedEmail || undefined,
                active:
                    activeFilter === ""
                        ? undefined
                        : activeFilter === "true"
            });

            setStudents(data);

        } catch (error) {

            console.error(error);

        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        const createData = {
            name: (document.getElementById("student-name") as HTMLInputElement).value,
            email: (document.getElementById("student-email") as HTMLInputElement).value,
            password: (document.getElementById("student-password") as HTMLInputElement).value
        };

        try {
            const response = await fetch(postEndpoint, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(createData),

            });

            if (response.ok) {
                fetchStudents();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    }

    const handleUpdate = async (event: React.FormEvent, id: string) => {
        event.preventDefault();

        const updateData = {
            name: (document.getElementById("student-name") as HTMLInputElement).value,
            email: (document.getElementById("student-email") as HTMLInputElement).value,
            password: (document.getElementById("student-password") as HTMLInputElement).value
        };

        try {
            const response = await fetch(`http://localhost:8080/students/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                fetchStudents();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleDeactivate = async () => {
        if (!selectedStudent) return;

        try {
            await deactivateStudent(selectedStudent.id.toString());
            await fetchStudents();
            setSelectedStudent(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleActivate = async () => {
        if (!selectedStudent) return;

        try {
            await activateStudent(selectedStudent.id.toString());
            await fetchStudents();
            setSelectedStudent(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchStudents();
    }, [debouncedName, debouncedEmail, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(nameFilter);
            setDebouncedEmail(emailFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter, emailFilter]);

    return {
        students,

        selectedStudent,
        setSelectedStudent,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNamefilter,

        emailFilter,
        setEmailFilter,

        debouncedName,
        setDebouncedName,

        debouncedEmail,
        setDebouncedEmail,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchStudents,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    };
}