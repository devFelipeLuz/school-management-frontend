import { useEffect, useState } from "react";
import {
    getStudents,
    deactivateStudent,
    activateStudent
} from "../services/studentService";

export interface Student {
    id: string;
    name: string;
    email: string;
    classroom: string;
    active: boolean;
}

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const [activeFilter, setActiveFilter] = useState("");
    const [nameFilter, setNamefilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");

    const [debouncedName, setDebouncedName] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useState("");

    const[initialLoading, setInitialLoading] = useState(false);

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
        initialLoading,

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

        fetchStudents,
        handleActivate,
        handleDeactivate
    };
}