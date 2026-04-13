import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Subject } from "../../../services/subjectService";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import SubjectCardForm from "../CardForm/SubjectCardForm";

interface EditCardProps {
    subject: Subject;
    closeModal: () => void;
    handleUpdate: (event: FormEvent, id: string) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
}

function SubjectEditCard({
    subject,
    closeModal,
    handleUpdate,
    isFinished,
    setIsFinished,
    error,
    setError,
    name,
    setName }: EditCardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, subject.id)

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
        <SubjectCardForm
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            name={name}
            setName={setName}
            placeholder="Leave it blank to keep current"
        />)
}

export default SubjectEditCard;