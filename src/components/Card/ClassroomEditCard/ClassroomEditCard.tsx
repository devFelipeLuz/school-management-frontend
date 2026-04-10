import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import ClassroomUpdateCardForm from "../CardForm/ClassroomUpdateCardForm";

export interface Classroom {
    id: string;
    name: string;
    enrollmentCountForSchoolYear: number;
    maxCapacity: number;
    active: boolean
}

interface EditCardProps {
    classroom: Classroom;
    handleUpdate: (e: FormEvent, id: string) => void;
    closeModal: () => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
}

function ClassroomEditCard({ classroom, handleUpdate, closeModal, isFinished, setIsFinished, error, setError }: EditCardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, classroom.id);

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
        <ClassroomUpdateCardForm
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            name={classroom.name}
        />
    )

}

export default ClassroomEditCard;