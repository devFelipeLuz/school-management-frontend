import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import ClassroomCreateCardForm from "../CardForm/ClassroomCreateCardForm";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (e: FormEvent) => void;
    isFinished: boolean,
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean,
    setError: Dispatch<SetStateAction<boolean>>;
}

function ClassroomCreationCard({closeModal, handleCreate, isFinished, setIsFinished, error, setError}: CreationProps) {
    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard 
                text="Classroom created successfully"
                cancelTextButton="close"
                successTextButton="confirm"
                confirm={() => {
                    setIsFinished(true);
                    closeModal();
                }}
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
        )
    }

    return (
        <ClassroomCreateCardForm 
        submit={handleCreate}
        closeModal={closeModal}
        title="Register a New Classroom"
        />
    )
}

export default ClassroomCreationCard;

