import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ProfessorCardForm from "../CardForm/ProfessorCardForm";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (event: FormEvent) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
    email?: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    password?: string;
    setPassword?: Dispatch<SetStateAction<string>>;
}

function ProfessorCreationCard({
    closeModal,
    handleCreate,
    isFinished,
    setIsFinished,
    error,
    setError,
    name,
    setName = () => { },
    email,
    setEmail = () => { },
    password,
    setPassword = () => { }
}: CreationProps) {


    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Professor created successfully"
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
        )
    }

    return (
        <ProfessorCardForm
            submit={handleCreate}
            closeModal={closeModal}
            title="Register a New Profssor"
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />
    )
}

export default ProfessorCreationCard;