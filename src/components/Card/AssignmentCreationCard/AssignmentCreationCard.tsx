import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import AssignmentForm from "../CardForm/AssignmentForm";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (event: FormEvent) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    professorId?: string;
    setProfessorId?: Dispatch<SetStateAction<string>>;
    subjectId?: string;
    setSubjectId?: Dispatch<SetStateAction<string>>;
    classroomId?: string;
    setClassroomId?: Dispatch<SetStateAction<string>>;
}

function AssignmentCreationCard({
    closeModal,
    handleCreate,
    isFinished,
    setIsFinished,
    error,
    setError,
    professorId,
    setProfessorId = () => { },
    subjectId,
    setSubjectId = () => { },
    classroomId,
    setClassroomId = () => { } }: CreationProps) {

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Assignment created successfully"
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
        <AssignmentForm
            submit={handleCreate}
            closeModal={closeModal}
            title="Register a New Profssor"
            professorId={professorId}
            setProfessorId={setProfessorId}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            classroomId={classroomId}
            setClassroomId={setClassroomId}
        />
    )
}

export default AssignmentCreationCard;