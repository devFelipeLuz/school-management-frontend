import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import Modal from "../../Modal/Modal";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";
import UserCardForm from "../CardForm/UserCardForm";

interface User {
    id: string;
    email: string;
    createdAt: Date;
    role: string;
    enabled: boolean;
}

interface EditCardProps {
    user: User;
    closeModal: () => void;
    handleUpdate: (event: FormEvent, id: string) => void;
    isFinished: boolean;
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
}


function UserEditCard({ user, closeModal, handleUpdate, isFinished, setIsFinished, error, setError }: EditCardProps) {

    const onSave = (e: React.FormEvent) => handleUpdate(e, user.id);

    if (isFinished) {
        return (
            <Modal>
                <ConfirmationCard
                    text="Updated successfully"
                    cancelTextButton="close"
                    successTextButton="confirm"
                    confirm={() => {
                        setIsFinished(false);
                        closeModal();
                    }}
                    cancel={closeModal}
                />
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal>
                <ConfirmationCard
                    text="An unexpected error occurred"
                    cancelTextButton="close"
                    successTextButton="confirm"
                    confirm={() => setError(false)}
                    cancel={closeModal}
                />
            </Modal>
        );
    }

    return (
        <UserCardForm
            title="Editing..."
            submit={onSave}
            closeModal={closeModal}
            email={user.email}
            password=""
            placeholder="Leave it blank to keep current"
        />)
}

export default UserEditCard;