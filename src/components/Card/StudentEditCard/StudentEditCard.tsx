import { useState } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import CardForm from "../CardForm/CardForm";

interface Student {
    id: number,
    name: string,
    email: string
}

interface CardProps {
    student: Student;
    closeModal: () => void;
    fetchStudents: () => void;
}


function StudentEditCard({ student, closeModal, fetchStudents }: CardProps) {
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    async function handleSave(event: React.FormEvent) {
        event.preventDefault();

        const updateData = {
            name: (document.getElementById("student-name") as HTMLInputElement).value,
            email: (document.getElementById("student-email") as HTMLInputElement).value,
            password: (document.getElementById("student-password") as HTMLInputElement).value
        };

        try {
            const token = localStorage.getItem("accessToken");
            const id = student.id.toString();

            const response = await fetch(`http://localhost:8080/students/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {

                await fetchStudents();

                setIsFinished(true);

            } else {

                setError(true);

            }

        } catch (error) {

            console.error("Network error:", error);

        }
    }

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard 
                text="Updated successfully"
                cancelTextButton="close"
                successTextButton="confirm"
                confirm={() => handleSave}
                cancel={closeModal}
                />
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal>
                <ConfirmationCard 
                text="An unexpected error occurred"
                cancelTextButton="close"
                successTextButton="confirm"
                confirm={() => setError(false)}
                cancel={closeModal}
                />
            </Modal>
        );
    }

    return (
        <CardForm 
        title="Editing..."
        submit={handleSave}
        closeModal={closeModal}
        name={student.name}
        email={student.email}
        placeholder="Leave it blank to keep current"
        />)
}

export default StudentEditCard;