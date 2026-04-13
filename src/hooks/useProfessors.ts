import { useEffect, useState } from "react";
import { activateProfessor, createProfessor, deactivateProfessor, getProfessors, updateProfessor, type Professor } from "../services/professorService";

export function useProfessors() {
    const [professor, setProfessor] = useState<Professor[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameFilter, setNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchProfessors = async () => {
        try {
            const data = await getProfessors({
                name: debouncedName || undefined,
                email: debouncedEmail || undefined,
                active: activeFilter === "" ? undefined : activeFilter === "true"
            });

            setProfessor(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createProfessor(name, email, password);

            if (response.ok) {
                fetchProfessors();
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
            const response = await updateProfessor(name, email, password, id);

            if (response.ok) {
                fetchProfessors();
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

    const handleActivate = async () => {
        if (!selectedProfessor) return;

        try {
            await activateProfessor(selectedProfessor.id.toString());
            await fetchProfessors();
            setSelectedProfessor(null);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeactivate = async () => {
        if (!selectedProfessor) return;

        try {
            await deactivateProfessor(selectedProfessor.id.toString());
            await fetchProfessors();
            setSelectedProfessor(null);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProfessors();
    }, [debouncedName, debouncedEmail, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(nameFilter);
            setDebouncedEmail(emailFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [nameFilter, emailFilter]);

    return {
        professor,
        setProfessor,

        selectedProfessor,
        setSelectedProfessor,

        name,
        setName,

        email,
        setEmail,

        password,
        setPassword,

        nameFilter,
        setNameFilter,

        emailFilter,
        setEmailFilter,

        activeFilter,
        setActiveFilter,

        debouncedName,
        setDebouncedName,

        debouncedEmail,
        setDebouncedEmail,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchProfessors,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    }
}