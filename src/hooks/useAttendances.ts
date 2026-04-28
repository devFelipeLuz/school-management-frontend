import { useState } from "react";
import { createAttendance, deleteAttendance, getAttendances, updateAttendance, type AttendanceRecord, type AttendanceSession } from "../services/attendanceService";

export function useAttendances() {
    const [session, setSession] = useState<AttendanceSession[]>([]);
    const [selectedSessioon, setSelectedSession] = useState<AttendanceSession | null>(null);
    const [students, setStudents] = useState<AttendanceRecord[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<AttendanceRecord | null>(null);

    //APi Response statement
    const [professor, setProfessor] = useState("");
    const [subject, setSubject] = useState("");
    const [classroom, setClassroom] = useState("");
    const [date, setDate] = useState("");
    const [student, setStudent] = useState("");
    

    //Cretion statement
    const [assignmentId, setAssignmentId] = useState("");
    const [enrollmentId, setEnrollmentId] = useState("");
    const [status, setStatus] = useState("");

    //Filter statement
    const [debouncedStudentName, setDebouncedStudentName] = useState("");
    const [debouncedStudentEmail, setDebouncedStudentEmail] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    //Modal statement
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);



    const fetchAttendances = async () => {
        try {
            const data = await getAttendances({
                studentName: debouncedStudentName || undefined,
                studentEmail: debouncedStudentEmail || undefined,
                status: statusFilter === "" ? undefined : statusFilter
            });

            setSession(data);

        } catch (error) {
            console.error(error);
        }
    };

    const clearState = () => {
        setProfessor("");
        setSubject("");
        setClassroom("");
        setDate("");
        setStudent("");
        setAssignmentId("");
        setEnrollmentId("");
        setStatus("");
    }

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await createAttendance(assignmentId, date, enrollmentId, status);

            if (response.ok) {
                fetchAttendances();
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

    const handleUpdate = async (event: React.FormEvent, sessionId: string, recordId: string) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await updateAttendance(sessionId, recordId, status);

            if (response.ok) {
                fetchAttendances();
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

    const handleDelete = async () => {
        if (!selectedSessioon) return;

        try {
            await deleteAttendance(selectedSessioon.id.toString());
            await fetchAttendances();
            setSelectedSession(null);

        } catch (error) {
            console.error(error);
        }
    };

    return {
        session,
        setSession,

        selectedSessioon,
        setSelectedSession,

        students,
        setStudents,

        selectedStudent,
        setSelectedStudent,

        professor,
        setProfessor,

        subject,
        setSubject,

        classroom,
        setClassroom,

        date,
        setDate,

        student,
        setStudent,

        assignmentId,
        setAssignmentId,

        enrollmentId,
        setEnrollmentId,

        status,
        setStatus,

        debouncedStudentName,
        setDebouncedStudentName,

        debouncedStudentEmail,
        setDebouncedStudentEmail,

        statusFilter,
        setStatusFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        fetchAttendances,
        clearState,
        handleCreate,
        handleUpdate,
        handleDelete
    }
}
