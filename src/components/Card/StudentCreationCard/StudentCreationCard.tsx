import { useState } from "react";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import Modal from "../../Modal/Modal";
import CardForm from "../CardForm/CardForm";

interface CreationProps {
    closeModal: () => void;
    fetchStudents: () => void;
}


function StudentCreationCard({ closeModal, fetchStudents }: CreationProps) {
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);
    const postEndpoint = "http://localhost:8080/students"

    async function handleCreate(event: React.FormEvent) {
        event.preventDefault();

        const createData = {
            name: (document.getElementById("student-name") as HTMLInputElement).value,
            email: (document.getElementById("student-email") as HTMLInputElement).value,
            password: (document.getElementById("student-password") as HTMLInputElement).value
        };

        try {

            const token = localStorage.getItem("accessToken");

            const response = await fetch(postEndpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(createData),

            });

            if (response.ok) {

                fetchStudents();
                setIsFinished(true)

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
                    text="Student created successfully"
                    cancelTextButton="close"
                    successTextButton="confirm"
                    confirm={() => handleCreate}
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
        submit={handleCreate}
        closeModal={closeModal}
        title="Register a New Student"
        />)
}

export default StudentCreationCard;