import { useState } from "react";
import { ActivateButton, DeactivateButton, EditButton, NewEntityButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";
import PageSetup from "../../components/PageSetup/PageSetup";
import RoleSelect from "../../components/SelectStatus/RoleSelect";
import SelectStatus from "../../components/SelectStatus/SelectStatus";
import { ActionButtons, Group, InputGroup, UserList, UserRow } from "./styles";
import { useUsers } from "../../hooks/useUsers";
import { ActiveTag, FinishedTag, InactiveTag } from "../../components/Tag/styles";
import Modal from "../../components/Modal/Modal";
import UserCreationCard from "../../components/Card/UserCreationCard/UserCreationCard";
import ConfirmationCard from "../../components/Card/ConfirmationCard/ConfirmationCard";
import UserEditCard from "../../components/Card/UserEditCard/UserEditCard";
import TableHeader from "../../components/TableHeader/TableHeader";

function Users() {

    const {
        users,

        selectedUser,
        setSelectedUser,

        activeFilter,
        setActiveFilter,

        emailFilter,
        setEmailFilter,

        roleFilter,
        setRoleFilter,

        isFinished,
        setIsFinished,

        error,
        setError,

        handleCreate,
        handleUpdate,
        handleDeactivate,
        handleActivate
    } = useUsers();

    const [userCreationModal, setUserCreationModal] = useState(false);
    const [userEditModal, setUserEditModal] = useState(false);
    const [activateUserModal, setActivateUserModal] = useState(false);
    const [deactivateUserModal, setDeactivateUserModal] = useState(false);

    return (
        <>
            {userCreationModal &&
                <Modal>
                    <UserCreationCard
                        closeModal={() => setUserCreationModal(false)}
                        handleCreate={handleCreate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {userEditModal &&
                <Modal>
                    <UserEditCard
                        user={selectedUser!}
                        closeModal={() => {
                            setSelectedUser(null);
                            setIsFinished(false);
                            setError(false);
                            setUserEditModal(false);
                        }}
                        handleUpdate={handleUpdate}
                        isFinished={isFinished}
                        setIsFinished={setIsFinished}
                        error={error}
                        setError={setError}
                    />
                </Modal>
            }

            {activateUserModal &&
                <Modal>
                    <ConfirmationCard
                        text="Activate this user?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleActivate}
                        cancel={() => setActivateUserModal(false)}
                    />
                </Modal>
            }

            {deactivateUserModal &&
                <Modal>
                    <ConfirmationCard
                        text="Are you sure you want to deactivate this user?"
                        cancelTextButton="cancel"
                        successTextButton="confirm"
                        confirm={handleDeactivate}
                        cancel={() => setDeactivateUserModal(false)}
                    />
                </Modal>
            }

            <PageSetup>
                <Group>
                    <InputGroup>
                        <LargeInput
                            type="text"
                            placeholder="Filter by email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                        />
                        <SelectStatus activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                        
                        <RoleSelect roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
                    </InputGroup>

                    <NewEntityButton
                        type="button"
                        onClick={() => setUserCreationModal(true)}
                    >
                        + New User
                    </NewEntityButton>
                </Group>

                <TableHeader>
                    <span>ID</span>
                    <span>Email</span>
                    <span>Creation Date</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Actions</span>
                </TableHeader>

                <UserList>
                    {users.map((item) => (
                        <UserRow key={item.id}>
                            <span>{item.id.slice(0, 8)}</span>
                            <span>{item.email}</span>
                            <span>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                            <FinishedTag>{item.role}</FinishedTag>
                            {item.enabled ? (
                                <ActiveTag>enabled</ActiveTag>
                            ) : (
                                <InactiveTag>disabled</InactiveTag>
                            )}

                            <ActionButtons>
                                <EditButton
                                    onClick={() => {
                                        setSelectedUser(item);
                                        setUserEditModal(true);
                                    }}
                                >
                                    edit
                                </EditButton>

                                {item.enabled ? (
                                    <DeactivateButton
                                        onClick={() => {
                                            setSelectedUser(item);
                                            setDeactivateUserModal(true);
                                        }}
                                    >
                                        disable
                                    </DeactivateButton>
                                ) : (
                                    <ActivateButton
                                        onClick={() => {
                                            setSelectedUser(item);
                                            setActivateUserModal(true);
                                        }}
                                    >
                                        activate
                                    </ActivateButton>
                                )}
                            </ActionButtons>
                        </UserRow>
                    ))}
                </UserList>
            </PageSetup>
        </>
    )
}

export default Users;