import { useEffect, useState } from "react";
import { activateAssessment, createAssessment, deactivateAssessment, getAssessments, updateAssessment, type Assessment } from "../services/assessmentService";

export function useAssessments() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [teachingAssignmentId, setTeachingAssignmentId] = useState("");
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    const [titleFilter, setTitleFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const [debouncedTitle, setDebouncedTitle] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const fetchAssessments = async () => {
        try {
            const data = await getAssessments({
                title: debouncedTitle || undefined,
                type: typeFilter === "" ? undefined : typeFilter,
                active: activeFilter === "" ? undefined : activeFilter === "true"
            });

            setAssessments(data);

        } catch (error) {
            console.error(error);
        }
    }

    const clearState = () => {
        setTitle("");
        setType("");
        setTeachingAssignmentId("");
        setSelectedAssignment("");
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createAssessment(title, type, teachingAssignmentId);

            if (response.ok) {
                fetchAssessments();
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

    const handleUpdate = async (event: React.FormEvent, assessmentId: string) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await updateAssessment(title, type, assessmentId);

            if (response.ok) {
                fetchAssessments();
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
        if (!selectedAssessment) return;

        try {
            await activateAssessment(selectedAssessment.id.toString());
            await fetchAssessments();
            setSelectedAssessment(null);

        } catch (error) {
            console.error(error);

        }
    };

    const handleDeactivate = async () => {
        if (!selectedAssessment) return;

        try {
            await deactivateAssessment(selectedAssessment.id.toString());
            await fetchAssessments();
            setSelectedAssessment(null);

        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        fetchAssessments();
    }, [debouncedTitle, typeFilter, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTitle(titleFilter);
        }, 500);

        return () => clearTimeout(timer);
    }, [titleFilter]);

    return {
        assessments,
        setAssessments,

        selectedAssessment,
        setSelectedAssessment,

        title,
        setTitle,

        type,
        setType,

        teachingAssignmentId,
        setTeachingAssignmentId,

        selectedAssignment,
        setSelectedAssignment,

        titleFilter,
        setTitleFilter,

        typeFilter,
        setTypeFilter,

        activeFilter,
        setActiveFilter,

        debouncedTitle,
        setDebouncedTitle,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchAssessments,
        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    }
}