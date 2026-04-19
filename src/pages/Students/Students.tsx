import Modal from "../../components/Modal/Modal";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import StudentCreationCard from "../../components/Card/StudentCreationCard/StudentCreationCard";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";
import StudentEditCard from "../../components/Card/StudentEditCard/StudentEditCard";
import { useStudents } from "../../hooks/useStudents";
import { useState } from "react";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import PageSetup from "../../components/PageSetup/PageSetup";
import { ActionButtons, Group, InputGroup, StudentList, StudentRow, TableHeader } from "./styles";

function Students() {
    const {
        students,

        selectedStudent,
        setSelectedStudent,

        name,
        setName,

        email,
        setEmail,

        password,
        setPassword,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNamefilter,

        emailFilter,
        setEmailFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useStudents();

    const [createStudentModal, setCreateStudentModal] = useState(false);
    const [editStudentModal, setEditStudentModal] = useState(false);
    const [activateStudentModal, setActivateStudentModal] = useState(false);
    const [deactivateStudentModal, setDeactivateStudentModal] = useState(false);

    return (
        <>
            {createStudentModal &&
                <Modal>
                    <StudentCreationCard
                        closeModal={() => {
                            setCreateStudentModal(false);
                            clearState();
                        }}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </Modal>}

            {editStudentModal &&
                <Modal>
                    <StudentEditCard
                        student={selectedStudent!}
                        closeModal={() => {
                            setSelectedStudent(null);
                            clearState();
                            setIsFinished(false);
                            setError(false);
                            setEditStudentModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </Modal>
            }

            {activateStudentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this student?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateStudentModal(false)}
                    />
                </Modal>}

            {deactivateStudentModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this student?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateStudentModal(false)}
                    />
                </Modal>}

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by name"
                            value={nameFilter}
                            onChange={(e) => setNamefilter(e.target.value)}
                        />
                        <LargeInput
                            type="text"
                            placeholder="Filter by email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                        />
                        <SelectStatus activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setCreateStudentModal(true)}>
                        + New Student
                    </NewEntityButton>
                </Group>
                <TableHeader>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Classroom</span>
                    <span>Status</span>
                    <span>Actions</span>
                </TableHeader>
                <StudentList>
                    {students.map((item) => (
                        <StudentRow key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            <span>{item.classroom || "N/A"}</span>

                            {item.active ? (
                                <ActiveTag>active</ActiveTag>
                            ) : (
                                <InactiveTag>inactive</InactiveTag>
                            )}

                            <ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedStudent(item);
                                        setName(item.name);
                                        setEmail(item.email);
                                        setPassword("");
                                        setEditStudentModal(true);
                                    }}
                                >
                                    edit
                                </EditButton>

                                {item.active ? (
                                    <DeactivateButton
                                        onClick={() => {
                                            setSelectedStudent(item);
                                            setDeactivateStudentModal(true);
                                        }}
                                    >
                                        deactivate
                                    </DeactivateButton>
                                ) : (
                                    <ActivateButton
                                        onClick={() => {
                                            setSelectedStudent(item);
                                            setActivateStudentModal(true);
                                        }}
                                    >
                                        activate
                                    </ActivateButton>
                                )}
                            </ActionButtons>
                        </StudentRow>
                    ))}
                </StudentList>
            </PageSetup>
        </>
    );
}

export default Students;