import { useEffect, useState, type FormEvent } from "react";
import {
    getSchoolyears,
    deactivateSchoolyear,
    activateSchoolyear
} from "../services/schoolyearService"
import { getAuthHeaders } from "../utils/auth";

interface Schoolyears {
    id: string;
    year: number;
    startDate: Date;
    active: boolean;
}

export function useSchoolyear() {
    const [schoolyears, setSchoolyears] = useState<Schoolyears[]>([]);
    const [selectedSchoolyear, setSelectedSchoolyear] = useState<Schoolyears | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    const [debouncedYear, setDebouncedYear] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const postEndpoint = "http://localhost:8080/school-years";

    const fetchSchoolyears = async () => {
        try {
            const data = await getSchoolyears({
                year: debouncedYear !== "" ? debouncedYear : undefined,
                active:
                    activeFilter === ""
                        ? undefined
                        : activeFilter === "true"
            });

            setSchoolyears(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (event: FormEvent) => {
        event.preventDefault();

        const createData = {
            year: Number((document.getElementById("schoolyear-year") as HTMLInputElement).value)
        };

        try {
            const response = await fetch(postEndpoint, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(createData),
            });

            if (response.ok) {
                fetchSchoolyears();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    }

    const handleUpdate = async (event: FormEvent, id: string) => {
        event.preventDefault();

        const updateData = {
            year: Number((document.getElementById("schoolyear-year") as HTMLInputElement).value)
        };

        try {
            const response = await fetch(`http://localhost:8080/school-years/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                fetchSchoolyears();
                setIsFinished(true);

            } else {
                setError(true);

            }

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleActivate = async () => {
        if (!selectedSchoolyear) return;

        try {
            await activateSchoolyear(selectedSchoolyear.id.toString());
            await fetchSchoolyears();
            setSelectedSchoolyear(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleDeactivate = async () => {
        if (!selectedSchoolyear) return;

        try {
            await deactivateSchoolyear(selectedSchoolyear.id.toString());
            await fetchSchoolyears();
            setSelectedSchoolyear(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchSchoolyears();
    }, [debouncedYear, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedYear(yearFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [yearFilter]);

    return {
        schoolyears,

        selectedSchoolyear,
        setSelectedSchoolyear,

        activeFilter,
        setActiveFilter,

        yearFilter,
        setYearFilter,

        debouncedYear,
        setDebouncedYear,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchSchoolyears,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    };
}
