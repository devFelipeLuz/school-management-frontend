import { DefaultModal } from "./styles";

interface ModalProps {
    children: React.ReactNode;
    onClick?: () => void;
}

function Modal({children, onClick}: ModalProps) {
    return <DefaultModal onClick={() => onClick && onClick()}>{children}</DefaultModal>
}

export default Modal;