import { useEffect, useState } from "react";
import {
    activateEnrollment,
    cancelEnrollment,
    createEnrollment,
    finishEnrollment,
    getEnrollments,
    type Enrollments
} from "../services/enrollmentService";

export function useEnrollments() {
    const [enrollments, setEnrollments] = useState<Enrollments[]>([]);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollments | null>(null);

    const [studentId, setStudentId] = useState("");
    const [classroomId, setClassroomId] = useState("");

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

    const clearState = () => {
        setStudentId("");
        setClassroomId("");
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createEnrollment(studentId, classroomId);

            if (response.ok) {
                fetchEnrollments();
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

        studentId,
        setStudentId,

        classroomId,
        setClassroomId,

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

        fetchEnrollments,
        clearState,
        handleCreate,
        handleCancel,
        handleFinish,
        handleActivate
    };
}