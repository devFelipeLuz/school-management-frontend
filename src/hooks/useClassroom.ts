import { useEffect, useState } from "react";
import { activateClassroom, createClassroom, deactivateClassroom, getClassrooms, updateClassroom, type Classroom } from "../services/classroomService";

export function useClassrooms() {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

    const [name, setName] = useState("");
    const [schoolYearId, setSchoolYearId] = useState("");
    const [capacity, setCapacity] = useState(Number);

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

    const clearState = () => {
        setName("");
        setSchoolYearId("");
        setCapacity(0);
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createClassroom(name, schoolYearId);

            if (response.ok) {
                fetchClassrooms();
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

    const handleUpdate = async (event: React.FormEvent, id: string) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await updateClassroom(name, capacity, id)

            if (response.ok) {
                fetchClassrooms();
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

        name,
        setName,

        schoolYearId,
        setSchoolYearId,

        capacity,
        setCapacity,

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

        clearState,
        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    }
}