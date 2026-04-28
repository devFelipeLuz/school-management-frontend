import type { Dispatch, FormEvent, SetStateAction } from "react";
import AssessmentUpdateForm from "../CardForm/AssessmentUpdateForm";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import type { Assessment } from "../../../services/assessmentService";

interface updateProps {
    assessment: Assessment;
    handleUpdate: (event: FormEvent, id: string) => void;
    closeModal: () => void;

    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;

    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;

    assessmentTitle?: string;
    setAssessmentTitle?: Dispatch<SetStateAction<string>>;

    assessmentType?: string;
    setAssessmentType?: Dispatch<SetStateAction<string>>;
}

function AssessmentUpdateCard({
    assessment,
    handleUpdate,
    closeModal,

    isFinished,
    setIsFinished,

    error,
    setError,

    assessmentTitle,
    setAssessmentTitle,

    assessmentType,
    setAssessmentType }: updateProps) {

        const onSave = (e: React.FormEvent) => handleUpdate(e, assessment.id);

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
        <AssessmentUpdateForm
            submit={onSave}
            closeModal={closeModal}

            cardTitle="Editing..."
            placeholder="Leave it blank to keep current"

            assessmentTitle={assessmentTitle}
            setAssessmentTitle={setAssessmentTitle}

            assessmentType={assessmentType}
            setAssessmentType={setAssessmentType}
        />
    )
}

export default AssessmentUpdateCard;