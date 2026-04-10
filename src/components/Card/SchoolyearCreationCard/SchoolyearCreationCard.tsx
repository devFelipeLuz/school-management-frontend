import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import SchoolyearCardForm from "../CardForm/SchoolyearCardForm";
import type { Dispatch, FormEvent, SetStateAction } from "react";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (event: FormEvent) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
}

function SchoolyearCreationCard({ closeModal, handleCreate, isFinished, setIsFinished, error, setError }: CreationProps) {

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="School Year created successfully"
                    cancelTextButton="close"
                    successTextButton="confirm"
                    confirm={() => {
                        setIsFinished(false);
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
        );
    }

    return (
        <SchoolyearCardForm
            submit={handleCreate}
            closeModal={closeModal}
            title="Register a new School Year"
        />
    )
}

export default SchoolyearCreationCard;