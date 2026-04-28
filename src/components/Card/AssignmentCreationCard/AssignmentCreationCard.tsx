import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import AssignmentForm from "../CardForm/AssignmentForm";
import type { Professor } from "../../../services/professorService";
import type { Subject } from "../../../services/subjectService";
import type { Classroom } from "../../../services/classroomService";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (event: FormEvent) => void;

    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;

    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;

    professorId?: string;
    setProfessorId?: Dispatch<SetStateAction<string>>;

    selectedProfessor: Professor | null;
    setSelectedProfessor: Dispatch<SetStateAction<Professor | null>>;

    subjectId?: string;
    setSubjectId?: Dispatch<SetStateAction<string>>;

    selectedSubject: Subject | null;
    setSelectedSubject: Dispatch<SetStateAction<Subject | null>>;

    classroomId?: string;
    setClassroomId?: Dispatch<SetStateAction<string>>;

    selectedClassroom: Classroom | null;
    setSelectedClassroom: Dispatch<SetStateAction<Classroom | null>>;
}

function AssignmentCreationCard({
    closeModal,
    handleCreate,

    isFinished,
    setIsFinished,

    error,
    setError,

    professorId,
    setProfessorId,

    selectedProfessor,
    setSelectedProfessor,

    subjectId,
    setSubjectId,

    selectedSubject,
    setSelectedSubject,

    classroomId,
    setClassroomId,

    selectedClassroom,
    setSelectedClassroom }: CreationProps) {

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
            title="Register a New Assignment"

            professorId={professorId}
            setProfessorId={setProfessorId}

            selectedProfessor={selectedProfessor}
            setSelectedProfessor={setSelectedProfessor}

            subjectId={subjectId}
            setSubjectId={setSubjectId}

            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}

            classroomId={classroomId}
            setClassroomId={setClassroomId}

            selectedClassroom={selectedClassroom}
            setSelectedClassroom={setSelectedClassroom}
        />
    )
}

export default AssignmentCreationCard;