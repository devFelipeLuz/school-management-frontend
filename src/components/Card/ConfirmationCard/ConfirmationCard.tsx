import { CancelButton, SuccessButton } from "../../Button/styles";
import { ButtonGroup, CardContainer, CartTitle } from "./styles";

interface ConfirmationProps {
    text: string;
    cancelTextButton: string;
    successTextButton: string;
    cancel: () => void;
    confirm?: () => void;
}

function ConfirmationCard({ text, cancelTextButton, successTextButton, cancel, confirm }: ConfirmationProps) {
    return (
        <CardContainer>
            <CartTitle>{text}</CartTitle>
            <ButtonGroup>
                <CancelButton onClick={() => cancel()}>{cancelTextButton}</CancelButton>
                <SuccessButton onClick={() => {confirm && confirm(), cancel();}}>{successTextButton}</SuccessButton>
            </ButtonGroup>
        </CardContainer>
    )
}

export default ConfirmationCard;