import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { LargeInput } from "../../components/Input/styles";
import MainContent from "../../components/MainContent/MainContent";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ActionButtons, Group, InputGroup, SchoolyearContainer, SchoolyearList, SchoolyearRow, TableHeader } from "./styles";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { useSchoolyear } from "../../hooks/useSchoolyears";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import SchoolyearCreationCard from "../../components/Card/SchoolyearCreationCard/SchoolyearCreationCard";
import SchoolyearEditCard from "../../components/Card/SchoolyearEditCard/SchoolyearEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";

function SchoolYear() {
    const {
        schoolyears,

        selectedSchoolyear,
        setSelectedSchoolyear,

        activeFilter,
        setActiveFilter,

        yearFilter,
        setYearFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useSchoolyear();

    const [schoolyearCreationModal, setSchoolYearCreationModal] = useState(false);
    const [schoolyearEditModal, setSchoolyearEditModal] = useState(false);
    const [activateSchoolYearModal, setActivateSchoolyearModal] = useState(false);
    const [deactivateSchoolyearModal, setDeactivateSchoolyearModal] = useState(false);


    return (
        <>
            {schoolyearCreationModal &&
                <Modal>
                    <SchoolyearCreationCard
                        closeModal={() => setSchoolYearCreationModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {schoolyearEditModal &&
                <Modal>
                    <SchoolyearEditCard
                        schoolyears={selectedSchoolyear!}
                        closeModal={() => {
                            setSelectedSchoolyear(null);
                            setIsFinished(false);
                            setError(false);
                            setSchoolyearEditModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {activateSchoolYearModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this schoolyear?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateSchoolyearModal(false)}
                    />
                </Modal>
            }

            {deactivateSchoolyearModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this schoolyear?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateSchoolyearModal(false)}
                    />
                </Modal>
            }

            <SectionWrapper>
                <Header />

                <SchoolyearContainer>
                    <Sidebar />
                    <MainContent>
                        <Container>
                            <Group>
                                <InputGroup>
                                    <LargeInput
                                        type="text"
                                        placeholder="Type the year"
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                    />
                                    <SelectStatus activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                                </InputGroup>
                                <NewEntityButton
                                    type="button"
                                    onClick={() => setSchoolYearCreationModal(true)}
                                >
                                    + New School Year
                                </NewEntityButton>
                            </Group>

                            <TableHeader>
                                <span>ID</span>
                                <span>Year</span>
                                <span>Start Date</span>
                                <span>Status</span>
                                <span>Actions</span>
                            </TableHeader>

                            <SchoolyearList>
                                {schoolyears.map((item) => (
                                    <SchoolyearRow key={item.id}>
                                        <span>{item.id}</span>
                                        <span>{item.year}</span>
                                        <span>{new Date(item.startDate).toLocaleDateString('pt-BR')}</span>
                                        {item.active ? (
                                            <ActiveTag>active</ActiveTag>
                                        ) : (
                                            <InactiveTag>inactive</InactiveTag>
                                        )}

                                        <ActionButtons>
                                            <EditButton onClick={() => {
                                                setSelectedSchoolyear(item);
                                                setSchoolyearEditModal(true);
                                            }}

                                            >
                                                edit
                                            </EditButton>

                                            {item.active ? (
                                                <DeactivateButton onClick={() => {
                                                    setSelectedSchoolyear(item);
                                                    setDeactivateSchoolyearModal(true);
                                                }}
                                                >
                                                    deactivate
                                                </DeactivateButton>
                                            ) : (
                                                <ActivateButton
                                                    onClick={() => {
                                                        setSelectedSchoolyear(item);
                                                        setActivateSchoolyearModal(true);
                                                    }}
                                                >
                                                    activate
                                                </ActivateButton>
                                            )}

                                        </ActionButtons>
                                    </SchoolyearRow>
                                ))}
                            </SchoolyearList>
                        </Container>
                    </MainContent>
                </SchoolyearContainer>
            </SectionWrapper>
        </>
    )
}

export default SchoolYear;