import { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/auth";
import { activateEnrollment, cancelEnrollment, finishEnrollment, getEnrollments } from "../services/enrollmentService";

export interface Enrollments {
    id: string;
    studentName: string;
    schoolYear: number;
    classroomName: string;
    enrolledAt: Date;
    status: string;
}

export function useEnrollments() {
    const [enrollments, setEnrollments] = useState<Enrollments[]>([]);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollments | null>(null);

    const [nameFilter, setNamefilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchEnrollments = async () => {
        try {
            const data = await getEnrollments({
                studentName: debouncedName || undefined,
                status:
                    activeFilter === "" ? undefined : activeFilter
            });

            setEnrollments(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        const createData = {
            studentId: (document.getElementById("student-id") as HTMLInputElement).value,
            classroomId: (document.getElementById("classroom-id") as HTMLInputElement).value
        };

        try {
            const response = await fetch(`http://localhost:8080/enrollments`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(createData)
            });

            if (response.ok) {
                fetchEnrollments();
                setIsFinished(true);

            } else {
                setError(true);
            }

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleCancel = async () => {
        if (!selectedEnrollment) return;

        try {
            await cancelEnrollment(selectedEnrollment.id.toString());
            await fetchEnrollments();
            setSelectedEnrollment(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleFinish = async () => {
        if (!selectedEnrollment) return;

        try {
            await finishEnrollment(selectedEnrollment.id.toString());
            await fetchEnrollments();
            setSelectedEnrollment(null);

        } catch (error) {
            console.error(error);

        }
    };
    const handleActivate = async () => {
        if (!selectedEnrollment) return;

        try {
            await activateEnrollment(selectedEnrollment.id.toString());
            await fetchEnrollments();
            setSelectedEnrollment(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, [debouncedName, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(nameFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter]);

    return {
        enrollments,

        selectedEnrollment,
        setSelectedEnrollment,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNamefilter,

        debouncedName,
        setDebouncedName,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleCancel,
        handleFinish,
        handleActivate
    }
}