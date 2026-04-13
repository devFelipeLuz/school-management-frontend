import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Professor } from "../../../services/professorService";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import ProfessorCardForm from "../CardForm/ProfessorCardForm";

interface ProfessorEditCardProps {
    professor: Professor;
    closeModal: () => void;
    handleUpdate: (event: FormEvent, id: string) => void;
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

function ProfessorEditCard({
    professor,
    closeModal,
    handleUpdate,
    isFinished,
    setIsFinished,
    error,
    setError,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword

}: ProfessorEditCardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, professor.id);


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
        <ProfessorCardForm
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            placeholder="Leave it blank to keep current"
        />
    )

}

export default ProfessorEditCard;