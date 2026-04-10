import { useState } from "react";
import PageSetup from "../../components/PageSetup/PageSetup";
import { useEnrollments } from "../../hooks/useEnrollments";
import EnrollmentSelectStatus from "../../components/SelectStatus/EnrollmentSelectStatus";
import { ActionButtons, EnrollmentList, EnrollmentRow, Group, InputGroup, TableHeader } from "./styles";
import { LargeInput } from "../../components/Input/styles";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { ActiveTag, FinishedTag, InactiveTag } from "../../components/Tag/styles";
import Modal from "../../components/Modal/Modal";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import EnrollmentCreationCard from "../../components/Card/EnrollmentCreationCard/EnrollmentCreationCard";

function Enrollments() {
    const {
        enrollments,

        setSelectedEnrollment,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNamefilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleCancel,
        handleFinish,
        handleActivate
    } = useEnrollments();

    const [enrollmentCreationModal, setEnrollmentCreationModal] = useState(false);
    const [activateEnrollmentModal, setActivateEnrollmentModal] = useState(false);
    const [cancelEnrollmentModal, setCancelEnrollmentModal] = useState(false);
    const [finishEnrollmentModal, setFinishEnrollmentModal] = useState(false);


    return (
        <>
            {enrollmentCreationModal &&
                <Modal>
                    <EnrollmentCreationCard
                        closeModal={() => setEnrollmentCreationModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {activateEnrollmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this enrollment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateEnrollmentModal(false)}
                    />
                </Modal>
            }

            {cancelEnrollmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this enrollment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleCancel}
                        cancel={() => setCancelEnrollmentModal(false)}
                    />
                </Modal>
            }

            {finishEnrollmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this enrollment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleFinish}
                        cancel={() => setFinishEnrollmentModal(false)}
                    />
                </Modal>
            }

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by name"
                            value={nameFilter}
                            onChange={(e) => setNamefilter(e.target.value)}
                        />
                        <EnrollmentSelectStatus
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setEnrollmentCreationModal(true)}
                    >
                        + New Enrollment
                    </NewEntityButton>
                </Group>

                <TableHeader>
                    <span>ID</span>
                    <span>Student</span>
                    <span>Year</span>
                    <span>Classroom</span>
                    <span>Enrolled Date</span>
                    <span>Status</span>
                    <span>Actions</span>
                </TableHeader>

                <EnrollmentList>
                    {enrollments.map((item) => (
                        <EnrollmentRow key={item.id}>
                            <span>{item.id.slice(0, 8)}</span>
                            <span>{item.studentName}</span>
                            <span>{item.schoolYear}</span>
                            <span>{item.classroomName}</span>
                            <span>{new Date(item.enrolledAt).toLocaleDateString('pt-BR')}</span>
                            {({
                                ACTIVE: <ActiveTag>ACTIVE</ActiveTag>,
                                FINISHED: <FinishedTag>FINISHED</FinishedTag>,
                                CANCELED: <InactiveTag>CANCELED</InactiveTag>
                            }[item.status])}

                            <ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedEnrollment(item);
                                        setFinishEnrollmentModal(true);
                                    }}
                                >
                                    finish
                                </EditButton>

                                {({
                                    ACTIVE:
                                        <DeactivateButton
                                            onClick={() => {
                                                setSelectedEnrollment(item);
                                                setCancelEnrollmentModal(true);
                                            }}
                                        >
                                            cancel
                                        </DeactivateButton>,

                                    FINISHED:
                                        <ActivateButton
                                            onClick={() => {
                                                setSelectedEnrollment(item);
                                                setActivateEnrollmentModal(true);
                                            }}
                                        >
                                            activate
                                        </ActivateButton>,

                                    CANCELED:
                                        <ActivateButton
                                            onClick={() => {
                                                setSelectedEnrollment(item);
                                                setActivateEnrollmentModal(true);
                                            }}
                                        >
                                            activate
                                        </ActivateButton>
                                }[item.status])}
                            </ActionButtons>
                            
                        </EnrollmentRow>
                    ))}
                </EnrollmentList>
            </PageSetup>
        </>
    )
}

export default Enrollments;