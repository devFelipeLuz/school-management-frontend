import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import EnrollmentForm from "../CardForm/EnrollmentForm";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (e: FormEvent) => void;
    isFinished: boolean,
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean,
    setError: Dispatch<SetStateAction<boolean>>;
    studentId: string;
    setStudentId: Dispatch<SetStateAction<string>>;
    classroomId: string;
    setClassroomId: Dispatch<SetStateAction<string>>;
}

function EnrollmentCreationCard({
    closeModal,
    handleCreate,
    isFinished,
    setIsFinished,
    error,
    setError,
    studentId,
    setStudentId,
    classroomId,
    setClassroomId }: CreationProps) {

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Enrollment created successfully"
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
        <EnrollmentForm
            submit={handleCreate}
            closeModal={closeModal}
            title="Register a New Classroom"
            studentId={studentId}
            setStudentId={setStudentId}
            classroomId={classroomId}
            setClassroomId={setClassroomId}
        />
    )

}

export default EnrollmentCreationCard;