import { useEffect, useState } from "react";
import { createAssignment, deleteAssignment, getAssignments, type Assignment } from "../services/assignmentService";

export function useAssignments() {
    const [assignment, setAssignment] = useState<Assignment[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

    const [professorId, setProfessorId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [classroomId, setClassroomId] = useState("");

    const [professorName, setProfessorName] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [classroomName, setClassroomName] = useState("");

    const [debouncedProfessorName, setDebouncedProfessorName] = useState("");
    const [debouncedSubjectName, setDebouncedSubjectName] = useState("");
    const [debouncedClassroomName, setDebouncedClassroomName] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchAssignments = async () => {
        try {
            const data = await getAssignments({
                professorName: debouncedProfessorName || undefined,
                subjectName: debouncedSubjectName || undefined,
                classroomName: debouncedClassroomName || undefined
            });

            setAssignment(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createAssignment(professorId, subjectId, classroomId);

            if (response.ok) {
                fetchAssignments();
                setIsFinished(true);
                clearState();

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

    const handleDelete = async () => {
        if (!selectedAssignment) return;

        try {
            await deleteAssignment(selectedAssignment.id.toString());
            await fetchAssignments();
            setSelectedAssignment(null);

        } catch (error) {
            console.error(error);
        }
    }

    const clearState = () => {
        setProfessorName("");
        setSubjectName("");
        setClassroomName("");
    }

    useEffect(() => {
        fetchAssignments();
    }, [debouncedProfessorName, debouncedSubjectName, debouncedClassroomName]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedProfessorName(professorName);
            setDebouncedSubjectName(subjectName);
            setDebouncedClassroomName(classroomName);
        }, 500);

        return () => clearTimeout(timer);
    }, [professorName, subjectName, classroomName]);

    return {
        assignment,
        setAssignment,

        selectedAssignment,
        setSelectedAssignment,

        professorId,
        setProfessorId,

        subjectId,
        setSubjectId,

        classroomId,
        setClassroomId,

        professorName,
        setProfessorName,

        subjectName,
        setSubjectName,

        classroomName,
        setClassroomName,

        debouncedProfessorName,
        setDebouncedProfessorName,

        debouncedSubjectName,
        setDebouncedSubjectName,

        debouncedClassroomName,
        setDebouncedClassroomName,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchAssignments,
        handleCreate,
        handleDelete,
        clearState
    }
}