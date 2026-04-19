import { useEffect, useState, type FormEvent } from "react";
import {
    getSchoolyears,
    deactivateSchoolyear,
    activateSchoolyear,
    type Schoolyears,
    createSchoolyear,
    updateSchoolyear
} from "../services/schoolyearService"

export function useSchoolyear() {
    const [schoolyears, setSchoolyears] = useState<Schoolyears[]>([]);
    const [selectedSchoolyear, setSelectedSchoolyear] = useState<Schoolyears | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    const [year, setYear] = useState("");

    const [debouncedYear, setDebouncedYear] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

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
        setError(false);


        try {
            const response = await createSchoolyear(year);

            if (response.ok) {
                fetchSchoolyears();
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

    const handleUpdate = async (event: FormEvent, id: string) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await updateSchoolyear(year, id);

            if (response.ok) {
                fetchSchoolyears();
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

        year,
        setYear,

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
