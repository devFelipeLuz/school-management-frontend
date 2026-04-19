import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import ClassroomUpdateCardForm from "../CardForm/ClassroomUpdateCardForm";
import type { Classroom } from "../../../services/classroomService";

interface EditCardProps {
    classroom: Classroom;
    handleUpdate: (e: FormEvent, id: string) => void;
    closeModal: () => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    schoolYearId: string;
    setSchoolYearId: Dispatch<SetStateAction<string>>;
    capacity: number;
    setCapacity: Dispatch<SetStateAction<number>>;
}

function ClassroomEditCard({
    classroom,
    handleUpdate,
    closeModal,
    isFinished,
    setIsFinished,
    error,
    setError,
    name,
    setName,
    capacity,
    setCapacity }: EditCardProps) {

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
            name={name}
            setName={setName}
            capacity={capacity}
            setCapacity={setCapacity}
        />
    )

}

export default ClassroomEditCard;