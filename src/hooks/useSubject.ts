import { useEffect, useState } from "react"
import { activateSubject, createSubject, deactivateSubject, getSubjects, updateSubject, type Subject } from "../services/subjectService";

export function useSubjects() {
    const [subject, setSubject] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const [name, setName] = useState("");

    const [nameFilter, setNameFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchSubjects = async () => {
        try {
            const data = await getSubjects({
                name: debouncedName || undefined,
                active: activeFilter === "" ? undefined : activeFilter === "true"
            });

            setSubject(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createSubject(name);

            if (response.ok) {
                fetchSubjects();
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
            const response = await updateSubject(name, id);

            if (response.ok) {
                fetchSubjects();
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

    const handleActivate = async () => {
        if (!selectedSubject) return;

        try {
            await activateSubject(selectedSubject.id.toString());
            await fetchSubjects();
            setSelectedSubject(null);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeactivate = async () => {
        if (!selectedSubject) return;

        try {
            await deactivateSubject(selectedSubject.id.toString());
            await fetchSubjects();
            setSelectedSubject(null);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [debouncedName, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(nameFilter)
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter]);

    return {
        subject,
        setSubject,

        selectedSubject,
        setSelectedSubject,

        name,
        setName,

        nameFilter,
        setNameFilter,

        activeFilter,
        setActiveFilter,

        debouncedName,
        setDebouncedName,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchSubjects,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    }
}