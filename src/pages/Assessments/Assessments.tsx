import { useState } from "react";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";
import PageSetup from "../../components/PageSetup/PageSetup";
import AssessmentTypeSelect from "../../components/SelectStatus/AssessmentTypeSelect";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { useAssessments } from "../../hooks/useAssessments";
import { ActionButtons, AssessmentList, AssessmentRow, Group, InputGroup } from "./styles";
import { AssessmentHeader } from "../../components/TableHeader/styles";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import Modal from "../../components/Modal/Modal";
import AssessmentCreationCard from "../../components/Card/AssessmentCreationCard/AssessmentCreationCard";
import AssessmentUpdateCard from "../../components/Card/AssessmentUpdateCard/AssessmentUpdateCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";

function Assessments() {
    const {
        assessments,

        selectedAssessment,
        setSelectedAssessment,

        title,
        setTitle,

        type,
        setType,

        teachingAssignmentId,
        setTeachingAssignmentId,

        selectedAssignment,
        setSelectedAssignment,

        titleFilter,
        setTitleFilter,

        typeFilter,
        setTypeFilter,

        activeFilter,
        setActiveFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useAssessments();

    const [createAssessmentModal, setCreateAssessmentModal] = useState(false);
    const [editAssessmentModal, setEditAssessmentModal] = useState(false);
    const [activateAssessmentModal, setActivateAssessmentModal] = useState(false);
    const [deactivateAssessmentModal, setDeactivateAssessmentModal] = useState(false);

    return (
        <>
            {createAssessmentModal &&
                <Modal>
                    <AssessmentCreationCard
                        closeModal={() => {
                            clearState();
                            setCreateAssessmentModal(false);
                        }}
                        handleCreate={handleCreate}

                        isFinished={isFinished}
                        setIsFinished={setIsFinished}

                        error={error}
                        setError={setError}

                        assessmentTitle={title}
                        setAssessmentTitle={setTitle}

                        assessmentType={type}
                        setAssessmentType={setType}

                        assignmentId={teachingAssignmentId}
                        setAssignmentId={setTeachingAssignmentId}

                        selectedAssignment={selectedAssignment}
                        setSelectedAssignment={setSelectedAssignment}
                    />
                </Modal>
            }

            {editAssessmentModal &&
                <Modal>
                    <AssessmentUpdateCard
                        assessment={selectedAssessment!}
                        closeModal={() => {
                            setSelectedAssessment(null);
                            clearState();
                            setIsFinished(false);
                            setError(false);
                            setEditAssessmentModal(false);
                        }}
                        handleUpdate={handleUpdate}

                        isFinished={isFinished}
                        setIsFinished={setIsFinished}

                        error={error}
                        setError={setError}

                        assessmentTitle={title}
                        setAssessmentTitle={setTitle}

                        assessmentType={type}
                        setAssessmentType={setType}
                    />
                </Modal>
            }

            {activateAssessmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this assessment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateAssessmentModal(false)}
                    />
                </Modal>
            }

            {deactivateAssessmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Deactivate this assessment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateAssessmentModal(false)}
                    />
                </Modal>
            }

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by title"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                        />

                        <AssessmentTypeSelect typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

                        <SelectStatus activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    </InputGroup>

                    <NewEntityButton type="button" onClick={() => {
                        setIsFinished(false);
                        setError(false);
                        clearState();
                        setCreateAssessmentModal(true);
                    }}>
                        + New Assessment
                    </NewEntityButton>
                </Group>

                <AssessmentHeader>
                    <span>ID</span>
                    <span>Title</span>
                    <span>Subject</span>
                    <span>Type</span>
                    <span>Professor</span>
                    <span>Classroom</span>
                    <span>Creation Date</span>
                    <span>Status</span>
                    <span>Actions</span>
                </AssessmentHeader>

                <AssessmentList>
                    {assessments.map((item) => (
                        <AssessmentRow key={item.id}>
                            <span>{item.id.slice(0, 8)}...</span>
                            <span>{item.title}</span>
                            <span>{item.subject}</span>
                            <span>{item.type}</span>
                            <span>{item.professorName}</span>
                            <span>{item.classroom}</span>
                            <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                            {item.active ?
                                <ActiveTag>active</ActiveTag> :
                                <InactiveTag>inactive</InactiveTag>}

                            <ActionButtons>
                                <EditButton onClick={() => {
                                    setSelectedAssessment(item);
                                    setTitle(item.title);
                                    setType(item.type);
                                    setEditAssessmentModal(true);
                                }}>edit</EditButton>

                                {item.active ?
                                    (<DeactivateButton
                                        onClick={() => {
                                            setSelectedAssessment(item);
                                            setDeactivateAssessmentModal(true);
                                        }}>deactivate</DeactivateButton>) :
                                    (<ActivateButton
                                        onClick={() => {
                                            setSelectedAssessment(item);
                                            setActivateAssessmentModal(true);
                                        }}
                                    >activate</ActivateButton>
                                    )}
                            </ActionButtons>
                        </AssessmentRow>
                    ))}
                </AssessmentList>
            </PageSetup>
        </>
    )

}

export default Assessments;