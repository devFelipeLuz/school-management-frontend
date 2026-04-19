import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import SchoolyearCardForm from "../CardForm/SchoolyearCardForm";

interface Schoolyears {
    id: string;
    year: number;
}

interface CardProps {
    schoolyears: Schoolyears;
    closeModal: () => void;
    handleUpdate: (event: FormEvent, id: string) => void;
    isFinished: boolean,
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    year: string;
    setYear: Dispatch<SetStateAction<string>>;
}

function SchooyearEditCard({ 
    schoolyears, 
    closeModal, 
    handleUpdate, 
    isFinished, 
    setIsFinished, 
    error, 
    setError, 
    year, 
    setYear }: CardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, schoolyears.id);

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Updated successfully"
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
                    text="An unexpected error occured"
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
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            year={year}
            setYear={setYear}
        />
    )
}

export default SchooyearEditCard;