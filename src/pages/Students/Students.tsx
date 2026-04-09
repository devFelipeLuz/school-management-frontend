import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as S from "./styles";
import Modal from "../../components/Modal/Modal";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import StudentCreationCard from "../../components/Card/StudentCreationCard/StudentCreationCard";
import { NewStudentButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";
import StudentEditCard from "../../components/Card/StudentEditCard/StudentEditCard";
import { useStudents } from "../../hooks/useStudents";
import { useState } from "react";

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

        fetchStudents,
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
                        fetchStudents={fetchStudents}
                    />
                </Modal>}

            {studentEditModal &&
                <Modal>
                    <StudentEditCard
                        student={selectedStudent!}
                        closeModal={() => {
                            setSelectedStudent(null);
                            setStudentEditModal(false);
                        }}
                        fetchStudents={fetchStudents}
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

            <S.StudentsWrapper>
                <Header />
                <S.StudentContainer>
                    <Sidebar />
                    <S.MainContent>
                        <S.Container>
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
                                    <S.StatusSelect
                                        value={activeFilter}
                                        onChange={(e) => setActiveFilter(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </S.StatusSelect>
                                </S.InputGroup>
                                <NewStudentButton
                                    type="button"
                                    onClick={() => setStudentCreationModal(true)}>
                                    + New Student
                                </NewStudentButton>
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
                                        <span>{item.id.slice(0, 8)}...</span>
                                        <span>{item.name}</span>
                                        <span>{item.email}</span>
                                        <span>{item.classroom || "N/A"}</span>

                                        {item.active ? (
                                            <S.ActiveTag>active</S.ActiveTag>
                                        ) : (
                                            <S.InactiveTag>inactive</S.InactiveTag>
                                        )}

                                        <S.ActionButtons>
                                            <S.EditStudentButton
                                                onClick={() => {
                                                    setSelectedStudent(item);
                                                    setStudentEditModal(true);
                                                }}
                                            >
                                                edit
                                            </S.EditStudentButton>

                                            {item.active ? (
                                                <S.DeactivateButton
                                                    onClick={() => {
                                                        setSelectedStudent(item);
                                                        setDeactivateStudentModal(true);
                                                    }}
                                                >
                                                    deactivate
                                                </S.DeactivateButton>
                                            ) : (
                                                <S.ActivateButton
                                                    onClick={() => {
                                                        setSelectedStudent(item);
                                                        setActivateStudentModal(true);
                                                    }}
                                                >
                                                    activate
                                                </S.ActivateButton>
                                            )}
                                        </S.ActionButtons>
                                    </S.StudentRow>
                                ))}
                            </S.StudentList>
                        </S.Container>
                    </S.MainContent>
                </S.StudentContainer>
            </S.StudentsWrapper >
        </>
    );
}

export default Students;