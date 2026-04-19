import { useState } from "react";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import { useClassrooms } from "../../hooks/useClassroom";
import { ActionButtons, ClassroomList, ClassroomRow, Group, InputGroup, TableHeader } from "./styles";
import Modal from "../../components/Modal/Modal";
import ClassroomCreationCard from "../../components/Card/ClassroomCreationCard/ClassroomCreationCard";
import ClassroomEditCard from "../../components/Card/ClassroomEditCard/ClassroomEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import PageSetup from "../../components/PageSetup/PageSetup";

function Classrooms() {
    const {
        classrooms,

        name,
        setName,

        schoolYearId,
        setSchoolYearId,

        capacity,
        setCapacity,

        selectedClassroom,
        setSelectedClassroom,

        selectedSchoolYear,
        setSelectedSchoolYear,

        activeFilter,
        setActiveFilter,

        nameFilter,
        setNameFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        clearState,
        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    } = useClassrooms();

    const [createClassroomModal, setCreateClassroomModal] = useState(false);
    const [editClassroomModal, setEditClassroomModal] = useState(false);
    const [activateClassroomModal, setActivateClassroomModal] = useState(false);
    const [deactivateClassroomModal, setDeactivateClassroomModal] = useState(false);

    return (
        <>
            {createClassroomModal &&
                <Modal>
                    <ClassroomCreationCard
                        closeModal={() => {
                            clearState();
                            setCreateClassroomModal(false);
                        }}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                        schoolYearId={schoolYearId}
                        setSchoolYearId={setSchoolYearId}
                        selectedSchoolYear={selectedSchoolYear}
                        setSelectedSchoolYear={setSelectedSchoolYear}
                    />
                </Modal>
            }

            {editClassroomModal &&
                <Modal>
                    <ClassroomEditCard
                        classroom={selectedClassroom!}
                        closeModal={() => {
                            setSelectedClassroom(null);
                            clearState();
                            setIsFinished(false);
                            setError(false);
                            setEditClassroomModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                        schoolYearId={schoolYearId}
                        setSchoolYearId={setSchoolYearId}
                        capacity={Number(capacity)}
                        setCapacity={setCapacity}
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

            <PageSetup>
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
                        onClick={() => {
                            setIsFinished(false);
                            setError(false);
                            clearState();
                            setCreateClassroomModal(true);
                        }}
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
                            <span>{item.id}</span>
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
                                        setName(item.name);
                                        setCapacity(item.maxCapacity);
                                        setEditClassroomModal(true);
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
            </PageSetup>
        </>
    )
}

export default Classrooms;