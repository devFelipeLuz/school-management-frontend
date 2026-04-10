import { useState } from "react";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { LargeInput } from "../../components/Input/styles";
import MainContent from "../../components/MainContent/MainContent";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import { useClassrooms } from "../../hooks/useClassroom";
import { ActionButtons, ClassroomContainer, ClassroomList, ClassroomRow, Group, InputGroup, TableHeader } from "./styles";
import Modal from "../../components/Modal/Modal";
import ClassroomCreationCard from "../../components/Card/ClassroomCreationCard/ClassroomCreationCard";
import ClassroomEditCard from "../../components/Card/ClassroomEditCard/ClassroomEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";

function Classrooms() {
    const {
        classrooms,

        selectedClassroom,
        setSelectedClassroom,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNameFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    } = useClassrooms();

    const [classroomCreationModal, setClassroomCreationModal] = useState(false);
    const [classroomEditModal, setClassroomEditModal] = useState(false);
    const [deactivateClassroomModal, setDeactivateClassroomModal] = useState(false);
    const [activateClassroomModal, setActivateClassroomModal] = useState(false);

    return (
        <>
            {classroomCreationModal &&
                <Modal>
                    <ClassroomCreationCard
                        closeModal={() => setClassroomCreationModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {classroomEditModal &&
                <Modal>
                    <ClassroomEditCard
                        classroom={selectedClassroom!}
                        closeModal={() => {
                            setSelectedClassroom(null);
                            setIsFinished(false);
                            setError(false);
                            setClassroomEditModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {activateClassroomModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this classroom?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateClassroomModal(false)}
                    />
                </Modal>
            }

            {deactivateClassroomModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are uou sure you want to deactivate this classroom?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateClassroomModal(false)}
                    />
                </Modal>
            }

            <SectionWrapper>
                <Header />
                <ClassroomContainer>
                    <Sidebar />
                    <MainContent>
                        <Container>
                            <Group>
                                <InputGroup>
                                    <LargeInput
                                        type="text"
                                        placeholder="Filter by class"
                                        value={nameFilter}
                                        onChange={(e) => setNameFilter(e.target.value)}
                                    />
                                    <SelectStatus activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                </InputGroup>

                                <NewEntityButton
                                    type="button"
                                    onClick={() => setClassroomCreationModal(true)}
                                >
                                    + New Classroom
                                </NewEntityButton>
                            </Group>

                            <TableHeader>
                                <span>ID</span>
                                <span>Classroom</span>
                                <span>Current Quantity</span>
                                <span>Max Capacity</span>
                                <span>Year</span>
                                <span>Status</span>
                                <span>Actions</span>
                            </TableHeader>

                            <ClassroomList>
                                {classrooms.map((item) => (
                                    <ClassroomRow key={item.id}>
                                        <span>{item.id.slice(0, 8)}...</span>
                                        <span>{item.name}</span>
                                        <span>{item.enrollmentCountForSchoolYear}</span>
                                        <span>{item.maxCapacity}</span>
                                        <span>{item.schoolYear}</span>

                                        {item.active ? (
                                            <ActiveTag>active</ActiveTag>
                                        ) : (
                                            <InactiveTag>inactive</InactiveTag>
                                        )}

                                        <ActionButtons>
                                            <EditButton
                                                onClick={() => {
                                                    setSelectedClassroom(item);
                                                    setClassroomEditModal(true);
                                                }}
                                            >
                                                edit
                                            </EditButton>

                                            {item.active ? (
                                                <DeactivateButton
                                                    onClick={() => {
                                                        setSelectedClassroom(item);
                                                        setDeactivateClassroomModal(true);
                                                    }}
                                                >
                                                    deactivate
                                                </DeactivateButton>
                                            ) : (
                                                <ActivateButton
                                                    onClick={() => {
                                                        setSelectedClassroom(item);
                                                        setActivateClassroomModal(true);
                                                    }}
                                                >
                                                    activate
                                                </ActivateButton>
                                            )}
                                        </ActionButtons>
                                    </ClassroomRow>
                                ))}
                            </ClassroomList>
                        </Container>
                    </MainContent>
                </ClassroomContainer>
            </SectionWrapper>
        </>
    )
}

export default Classrooms;