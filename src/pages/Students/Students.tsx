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
                        <S.InputGroup>
                            <LargeInput type="text" placeholder="Nome / Email" />
                            <NewStudentButton
                                type="button"
                                onClick={() => setStudentCreationModal(true)}>
                                + New Student
                            </NewStudentButton>
                        </S.InputGroup>
                        <S.StudentList>
                            {students.map((item) => (
                                <li key={item.id}>
                                    <div>
                                        <S.Title>ID</S.Title>
                                        <span>{item.id}</span>
                                    </div>
                                    <div>
                                        <S.Title>Nome</S.Title>
                                        <span>{item.name}</span>
                                    </div>
                                    <div>
                                        <S.Title>Email</S.Title>
                                        <span>{item.email}</span>
                                    </div>
                                    <div>
                                        <S.Title>Classroom</S.Title>
                                        <span>{item.classroom || "N/A"}</span>
                                    </div>
                                    <div>
                                        <S.Title>Status</S.Title>
                                        {item.active ?
                                            (<S.ActiveTag>active</S.ActiveTag>) :
                                            (<S.InactiveTag>inactive</S.InactiveTag>)}
                                    </div>
                                    <div>
                                        <S.EditStudentButton
                                            onClick={() => {
                                                setSelectedStudent(item);
                                                setStudentEditModal(true);
                                            }}>
                                            edit</S.EditStudentButton>

                                        {item.active ? (
                                            <S.DeactivateButton
                                                onClick={() => {
                                                    setSelectedStudent(item);
                                                    setDeactivateStudentModal(true);
                                                }}>deactivate</S.DeactivateButton>
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
                                    </div>
                                </li>
                            ))}
                        </S.StudentList>
                    </S.MainContent>
                </S.StudentContainer>
            </S.StudentsWrapper>
        </>
    );
}

export default Students;