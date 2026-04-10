import * as S from "./styles";
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

function Students() {
    const {
        students,

        selectedStudent,
        setSelectedStudent,

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

        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useStudents();

    const [deactivateStudentModal, setDeactivateStudentModal] = useState(false);
    const [activateStudentModal, setActivateStudentModal] = useState(false);
    const [studentCreationModal, setStudentCreationModal] = useState(false);
    const [studentEditModal, setStudentEditModal] = useState(false);

    return (
        <>
            {studentCreationModal &&
                <Modal>
                    <StudentCreationCard
                        closeModal={() => setStudentCreationModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>}

            {studentEditModal &&
                <Modal>
                    <StudentEditCard
                        student={selectedStudent!}
                        closeModal={() => {
                            setSelectedStudent(null);
                            setIsFinished(false);
                            setError(false);
                            setStudentEditModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
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
                <S.Group>
                    <S.InputGroup>
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
                    </S.InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setStudentCreationModal(true)}>
                        + New Student
                    </NewEntityButton>
                </S.Group>
                <S.TableHeader>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Classroom</span>
                    <span>Status</span>
                    <span>Actions</span>
                </S.TableHeader>
                <S.StudentList>
                    {students.map((item) => (
                        <S.StudentRow key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            <span>{item.classroom || "N/A"}</span>

                            {item.active ? (
                                <ActiveTag>active</ActiveTag>
                            ) : (
                                <InactiveTag>inactive</InactiveTag>
                            )}

                            <S.ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedStudent(item);
                                        setStudentEditModal(true);
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
                            </S.ActionButtons>
                        </S.StudentRow>
                    ))}
                </S.StudentList>
            </PageSetup>
        </>
    );
}

export default Students;