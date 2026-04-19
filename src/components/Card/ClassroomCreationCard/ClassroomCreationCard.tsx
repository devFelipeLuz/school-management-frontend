import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import ClassroomCreateCardForm from "../CardForm/ClassroomCreateCardForm";
import type { Schoolyears } from "../../../services/schoolyearService";

interface CreationProps {
    closeModal: () => void;
    handleCreate: (e: FormEvent) => void;

    isFinished: boolean,
    setIsFinished: Dispatch<SetStateAction<boolean>>;

    error: boolean,
    setError: Dispatch<SetStateAction<boolean>>;

    name: string;
    setName: Dispatch<SetStateAction<string>>;

    schoolYearId: string;
    setSchoolYearId: Dispatch<SetStateAction<string>>;

    selectedSchoolYear: Schoolyears | null;
    setSelectedSchoolYear: Dispatch<SetStateAction<Schoolyears | null>>;
}

function ClassroomCreationCard({
    closeModal,
    handleCreate,
    isFinished,
    setIsFinished,
    error,
    setError,
    name,
    setName,
    schoolYearId,
    setSchoolYearId,
    selectedSchoolYear,
    setSelectedSchoolYear }: CreationProps) {

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Classroom created successfully"
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
        <ClassroomCreateCardForm
            submit={handleCreate}
            closeModal={closeModal}
            title="Register a New Classroom"
            name={name}
            setName={setName}
            schoolyearId={schoolYearId}
            setSchoolyearId={setSchoolYearId}
            selectedSchoolYear={selectedSchoolYear}
            setSelectedSchoolYear={setSelectedSchoolYear}
        />
    )
}

export default ClassroomCreationCard;

