import { useState } from "react";
import PageSetup from "../../components/PageSetup/PageSetup";
import { useProfessors } from "../../hooks/useProfessors";
import { ActionButtons, Group, InputGroup, ProfessorList, ProfessorRow } from "./styles";
import { LargeInput } from "../../components/Input/styles";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { ProfessorHeader } from "../../components/TableHeader/styles";
import { ActiveTag, InactiveTag } from "../../components/Tag/styles";
import Modal from "../../components/Modal/Modal";
import ProfessorCreationCard from "../../components/Card/ProfessorCreationCard/ProfessorCreationCard";
import ProfessorEditCard from "../../components/Card/ProfessorEditCard/ProfessorEditCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";

function Professors() {
    const {
        professor,

        selectedProfessor,
        setSelectedProfessor,

        name,
        setName,

        email,
        setEmail,

        password,
        setPassword,

        nameFilter,
        setNameFilter,

        emailFilter,
        setEmailFilter,

        activeFilter,
        setActiveFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        clearState,
        handleCreate,
        handleUpdate,
        handleActivate,
        handleDeactivate
    } = useProfessors();

    const [createProfessorModal, setCreateProfessorModal] = useState(false);
    const [editProfessorModal, setEditProfessorModal] = useState(false);
    const [activateProfessorModal, setActivateProfessorModal] = useState(false);
    const [deactivateProfessorModal, setDeactivateProfessorModal] = useState(false);

    return (
        <>
            {createProfessorModal &&
                <Modal>
                    <ProfessorCreationCard
                        closeModal={() => {
                            clearState();
                            setCreateProfessorModal(false);
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
                </Modal>
            }

            {editProfessorModal &&
                <Modal>
                    <ProfessorEditCard
                        professor={selectedProfessor!}
                        closeModal={() => {
                            setSelectedProfessor(null);
                            clearState();
                            setIsFinished(false);
                            setError(false);
                            setEditProfessorModal(false);
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

            {activateProfessorModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this professor?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateProfessorModal(false)}
                    />
                </Modal>
            }

            {deactivateProfessorModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this professor?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateProfessorModal(false)}
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
                        <LargeInput
                            type="text"
                            placeholder="Filter by email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                        />
                        <SelectStatus
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setCreateProfessorModal(true)}>
                        + New Professor
                    </NewEntityButton>
                </Group>

                <ProfessorHeader>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Status</span>
                    <span>Actions</span>
                </ProfessorHeader>

                <ProfessorList>
                    {professor.map((item) => (
                        <ProfessorRow key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            {item.active ?
                                <ActiveTag>active</ActiveTag> :
                                <InactiveTag>inactive</InactiveTag>}

                            <ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedProfessor(item);
                                        setName(item.name);
                                        setEmail(item.email);
                                        setPassword("");
                                        setEditProfessorModal(true);
                                    }}>
                                    edit
                                </EditButton>

                                {item.active ? (
                                    <DeactivateButton
                                        onClick={() => {
                                            setSelectedProfessor(item);
                                            setDeactivateProfessorModal(true);
                                        }}>
                                        deactive
                                    </DeactivateButton>
                                ) : (
                                    <ActivateButton
                                        onClick={() => {
                                            setSelectedProfessor(item);
                                            setActivateProfessorModal(true);
                                        }}>
                                        activate
                                    </ActivateButton>
                                )}
                            </ActionButtons>

                        </ProfessorRow>
                    ))}
                </ProfessorList>
            </PageSetup>
        </>
    )
}

export default Professors;