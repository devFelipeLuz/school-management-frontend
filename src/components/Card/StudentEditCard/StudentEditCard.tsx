import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import StudentCardForm from "../CardForm/StudentCardForm";

interface Student {
    id: string,
    name: string,
    email: string
}

interface EditCardProps {
    student: Student;
    closeModal: () => void;
    handleUpdate: (event: FormEvent, id: string) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
}


function StudentEditCard({
    student,
    closeModal,
    handleUpdate,
    isFinished,
    setIsFinished,
    error,
    setError }: EditCardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, student.id);

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
        <StudentCardForm
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            name={student.name}
            email={student.email}
            placeholder="Leave it blank to keep current"
        />)
}

export default StudentEditCard;