import { useState } from "react";
import { useAssignments } from "../../hooks/useAssignments";
import AssignmentCreationCard from "../../components/Card/AssignmentCreationCard/AssignmentCreationCard";
import Modal from "../../components/Modal/Modal";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import PageSetup from "../../components/PageSetup/PageSetup";
import { ActionButtons, AssignmentList, AssignmentRow, Group, InputGroup } from "./styles";
import { LargeInput } from "../../components/Input/styles";
import { DeactivateButton, NewEntityButton } from "../../components/Button/styles";
import { AssignmentHeader } from "../../components/TableHeader/styles";

function Assignments() {
    const {
        assignment,

        setSelectedAssignment,

        professorId,
        setProfessorId,

        subjectId,
        setSubjectId,

        classroomId,
        setClassroomId,

        professorName,
        setProfessorName,

        subjectName,
        setSubjectName,

        classroomName,
        setClassroomName,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleDelete,
        clearState
    } = useAssignments();

    const [createAssignmentModal, setCreateAssignmentModal] = useState(false);
    const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);

    return (
        <>
            {createAssignmentModal &&
                <Modal>
                    <AssignmentCreationCard
                        closeModal={() => {
                            setCreateAssignmentModal(false);
                            clearState
                        }}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        professorId={professorId}
                        setProfessorId={setProfessorId}
                        subjectId={subjectId}
                        setSubjectId={setSubjectId}
                        classroomId={classroomId}
                        setClassroomId={setClassroomId}
                    />
                </Modal>
            }

            {deleteAssignmentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Delete this assignment?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDelete}
                        cancel={() => setDeleteAssignmentModal(false)}
                    />
                </Modal>
            }

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by professor name"
                            value={professorName}
                            onChange={(e) => setProfessorName(e.target.value)}
                        />
                        <LargeInput
                            type="text"
                            placeholder="Filter by subject name"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />

                        <LargeInput
                            type="text"
                            placeholder="Filter by classroom name"
                            value={classroomName}
                            onChange={(e) => setClassroomName(e.target.value)}
                        />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setCreateAssignmentModal(true)}>
                        + New Assignment
                    </NewEntityButton>
                </Group>

                <AssignmentHeader>
                    <span>ID</span>
                    <span>Professor</span>
                    <span>Subject</span>
                    <span>Classroom</span>
                    <span>Actions</span>
                </AssignmentHeader>

                <AssignmentList>
                    {assignment.map((item) => (
                        <AssignmentRow key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.professorName}</span>
                            <span>{item.subjectName}</span>
                            <span>{item.classroomName}</span>

                            <ActionButtons>
                                <DeactivateButton
                                    onClick={() => {
                                        setSelectedAssignment(item);
                                        setDeleteAssignmentModal(true);
                                    }}>
                                    delete
                                </DeactivateButton>


                            </ActionButtons>

                        </AssignmentRow>
                    ))}
                </AssignmentList>
            </PageSetup>
        </>
    )
}

export default Assignments;