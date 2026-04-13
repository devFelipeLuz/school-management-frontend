import { useState } from "react";
import { useSubjects } from "../../hooks/useSubject";
import PageSetup from "../../components/PageSetup/PageSetup";
import { ActionButtons, Group, InputGroup, SubjectList, SubjectRow } from "./styles";
import { LargeInput } from "../../components/Input/styles";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { SubjectHeader } from "../../components/TableHeader/styles";
import { ActiveTag } from "../../components/Tag/styles";
import Modal from "../../components/Modal/Modal";
import SubjectCreationCard from "../../components/Card/SubjectCreationCard/SubjectCreationCard";
import SubjectEditCard from "../../components/Card/SubjectEditCard/SubjectEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";

function Subject() {
    const {
        subject,

        selectedSubject,
        setSelectedSubject,

        name,
        setName,

        nameFilter,
        setNameFilter,

        activeFilter,
        setActiveFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useSubjects();

    const [createSubjectModal, setCreateSubjectModal] = useState(false);
    const [editSubjectModal, setEditSubjectModal] = useState(false);
    const [activateSubjectModal, setActivateSubjectModal] = useState(false);
    const [deactivateSubjectModal, setDeactivateSubjectModal] = useState(false);

    return (
        <>
            {createSubjectModal &&
                <Modal>
                    <SubjectCreationCard
                        closeModal={() => setCreateSubjectModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                    />
                </Modal>
            }

            {editSubjectModal &&
                <Modal>
                    <SubjectEditCard
                        subject={selectedSubject!}
                        closeModal={() => {
                            setSelectedSubject(null);
                            setIsFinished(false);
                            setError(false);
                            setEditSubjectModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                        name={name}
                        setName={setName}
                    />
                </Modal>
            }

            {activateSubjectModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this subject?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateSubjectModal(false)}
                    />
                </Modal>
            }

            {deactivateSubjectModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this subject?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateSubjectModal(false)}
                    />
                </Modal>
            }

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by name"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />

                        <SelectStatus
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setCreateSubjectModal(true)}>
                        + New Subject
                    </NewEntityButton>
                </Group>

                <SubjectHeader>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Status</span>
                    <span>Actions</span>
                </SubjectHeader>

                <SubjectList>
                    {subject.map((item) => (
                        <SubjectRow key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            {item.active ?
                                <ActiveTag>active</ActiveTag> :
                                <ActivateButton>inactive</ActivateButton>}

                            <ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedSubject(item);
                                        setName(item.name);
                                        setEditSubjectModal(true);
                                    }}>
                                    edit
                                </EditButton>

                                {item.active ? (
                                    <DeactivateButton
                                        onClick={() => {
                                            setSelectedSubject(item);
                                            setDeactivateSubjectModal(true);
                                        }}
                                    >
                                        deactivate
                                    </DeactivateButton>
                                ) : (
                                    <ActivateButton
                                        onClick={() => {
                                            setSelectedSubject(item);
                                            setActivateSubjectModal(true);
                                        }}
                                    >
                                        activate
                                    </ActivateButton>
                                )}
                            </ActionButtons>
                        </SubjectRow>
                    ))}
                </SubjectList>
            </PageSetup>
        </>
    )
}

export default Subject;