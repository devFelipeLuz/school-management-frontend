import { useEffect, useState } from "react";
import {
    getStudents,
    deactivateStudent,
    activateStudent
} from "../services/studentService";

export interface Student {
    id: number;
    name: string;
    email: string;
    classroom: string;
    active: boolean;
}

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeactivate = async () => {
        try {
            if (!selectedStudent) return;

            await deactivateStudent(selectedStudent.id.toString());
            await fetchStudents();
            setSelectedStudent(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleActivate = async () => {
        try {
            if (!selectedStudent) return;

            await activateStudent(selectedStudent.id.toString());
            await fetchStudents();
            setSelectedStudent(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return {
        students,
        selectedStudent,
        setSelectedStudent,
        fetchStudents,
        handleActivate,
        handleDeactivate
    };
}