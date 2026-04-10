import { useEffect, useState } from "react";
import { activateClassroom, deactivateClassroom, getClassrooms } from "../services/classroomService";
import { getAuthHeaders } from "../utils/auth";

export interface Classroom {
    id: string;
    name: string;
    enrollmentCountForSchoolYear: number;
    maxCapacity: number;
    schoolYear: number;
    active: boolean;
}

export function useClassrooms() {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchClassrooms = async () => {
        try {
            const data = await getClassrooms({
                name: debouncedName || undefined,
                active:
                    activeFilter === ""
                        ? undefined
                        : activeFilter === "true"
            });

            setClassrooms(data);

        } catch (error) {
            console.error(error);

        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        const createData = {
            name: (document.getElementById("classroom-name") as HTMLInputElement).value,
            schoolYearId: (document.getElementById("schoolyear-id") as HTMLInputElement).value
        };

        try {
            const response = await fetch(
                `http://localhost:8080/classrooms`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(createData),
            });

            if (response.ok) {
                fetchClassrooms();
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
            name: (document.getElementById("classroom-name") as HTMLInputElement).value,
            newCapacity: (document.getElementById("classroom-new-capacity") as HTMLInputElement).value
        };

        try {
            const response = await fetch(
                `http://localhost:8080/classrooms/${id}`, {

                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                fetchClassrooms();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleDeactivate = async () => {
        if (!selectedClassroom) return;

        try {
            await deactivateClassroom(selectedClassroom.id.toString());
            await fetchClassrooms();
            setSelectedClassroom(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleActivate = async () => {
        if (!selectedClassroom) return;

        try {
            await activateClassroom(selectedClassroom.id.toString());
            await fetchClassrooms();
            setSelectedClassroom(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchClassrooms();
    }, [debouncedName, activeFilter])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(nameFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter])

    return {
        classrooms,

        selectedClassroom,
        setSelectedClassroom,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNameFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    }
}