import type { Dispatch, FormEvent, SetStateAction } from "react";
import AssessmentCreateForm from "../CardForm/AssessmentCreateForm";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import type { Assignment } from "../../../services/assignmentService";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (event: FormEvent) => void;

    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;

    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;

    assessmentTitle: string;
    setAssessmentTitle: Dispatch<SetStateAction<string>>;

    assessmentType: string;
    setAssessmentType: Dispatch<SetStateAction<string>>;

    assignmentId: string;
    setAssignmentId: Dispatch<SetStateAction<string>>;

    selectedAssignment: Assignment | null;
    setSelectedAssignment: Dispatch<SetStateAction<Assignment | null>>;
}

function AssessmentCreationCard({
    closeModal,
    handleCreate,

    isFinished,
    setIsFinished,

    error,
    setError,

    assessmentTitle,
    setAssessmentTitle,

    assessmentType,
    setAssessmentType,

    assignmentId,
    setAssignmentId,

    selectedAssignment,
    setSelectedAssignment

}: CreationProps) {

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Assessment created successfully"
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
        <AssessmentCreateForm
            submit={handleCreate}
            closeModal={closeModal}
            cardTitle="Register a new Assessment"

            assessmentTitle={assessmentTitle}
            setAssessmentTitle={setAssessmentTitle}

            assessmentType={assessmentType}
            setAssessmentType={setAssessmentType}

            assignmentId={assignmentId}
            setAssignmentId={setAssignmentId}

            selectedAssignment={selectedAssignment}
            setSelectedAssignment={setSelectedAssignment}
        />
    )
}

export default AssessmentCreationCard;