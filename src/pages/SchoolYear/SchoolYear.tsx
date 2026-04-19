import { LargeInput } from "../../components/Input/styles";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActionButtons, Group, InputGroup, SchoolyearList, SchoolyearRow, TableHeader } from "./styles";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { useSchoolyear } from "../../hooks/useSchoolyears";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import SchoolyearCreationCard from "../../components/Card/SchoolyearCreationCard/SchoolyearCreationCard";
import SchoolyearEditCard from "../../components/Card/SchoolyearEditCard/SchoolyearEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import PageSetup from "../../components/PageSetup/PageSetup";

function SchoolYear() {
    const {
        schoolyears,

        selectedSchoolyear,
        setSelectedSchoolyear,

        activeFilter,
        setActiveFilter,

        yearFilter,
        setYearFilter,

        year,
        setYear,

        isFinished,
        setIsFinished,

        error,
        setError,

        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useSchoolyear();

    const [createSchoolyearModal, setCreateSchoolyearModal] = useState(false);
    const [editSchoolyearModal, setEditSchoolyearModal] = useState(false);
    const [activateSchoolYearModal, setActivateSchoolyearModal] = useState(false);
    const [deactivateSchoolyearModal, setDeactivateSchoolyearModal] = useState(false);


    return (
        <>
            {createSchoolyearModal &&
                <Modal>
                    <SchoolyearCreationCard
                        closeModal={() => {
                            clearState();
                            setCreateSchoolyearModal(false);
                        }}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        year={year}
                        setYear={setYear}
                    />
                </Modal>
            }

            {editSchoolyearModal &&
                <Modal>
                    <SchoolyearEditCard
                        schoolyears={selectedSchoolyear!}
                        closeModal={() => {
                            setSelectedSchoolyear(null);
                            clearState();
                            setIsFinished(false);
                            setError(false);
                            setEditSchoolyearModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        year={year}
                        setYear={setYear}
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

            <PageSetup>
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
                        onClick={() => setCreateSchoolyearModal(true)}
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
                                    setYear(String(item.year));
                                    setEditSchoolyearModal(true);
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
            </PageSetup>
        </>
    )
}

export default SchoolYear;