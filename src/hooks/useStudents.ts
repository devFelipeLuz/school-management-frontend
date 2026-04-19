import { useEffect, useState } from "react";
import {
    getStudents,
    deactivateStudent,
    activateStudent,
    type Students,
    createStudent,
    updateStudent
} from "../services/studentService";

export function useStudents() {
    const [students, setStudents] = useState<Students[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [activeFilter, setActiveFilter] = useState("");
    const [nameFilter, setNamefilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

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

    const clearState = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createStudent(name, email, password);

            if (response.ok) {
                fetchStudents();
                setIsFinished(true);

            } else {
                const errorData = await response.json();
                console.error("Backend error: ", errorData.messsage);
                setError(true);
            }

        } catch (error) {
            console.error("Network error:", error);
            setError(true);
        }
    }

    const handleUpdate = async (event: React.FormEvent, id: string) => {
        event.preventDefault();
        setError(false);
        
        try {
            const response = await updateStudent(name, email, password, id);

            if (response.ok) {
                fetchStudents();
                setIsFinished(true);

            } else {
                const errorData = await response.json();
                console.error("Backend error: ", errorData.messsage);
                setError(true);
            }

        } catch (error) {
            console.error("Network error:", error);
            setError(true);
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

        name,
        setName,

        email,
        setEmail,

        password,
        setPassword,

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
        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    };
}