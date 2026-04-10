import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import * as S from "./styles";

interface StudentCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    email?: string;
    placeholder?: string;
}

function StudentCardForm({ submit, closeModal, title, name, email, placeholder }: StudentCardFormProps) {
    return (
        <S.Section>
            <S.Form onSubmit={submit}>
                <S.Title>{title}</S.Title>
                <S.InputGroup>
                    <S.Label htmlFor="student-name">Name</S.Label>
                    <Input
                        type="text"
                        name="student-name"
                        id="student-name"
                        defaultValue={name}
                    />
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label htmlFor="student-email">Email</S.Label>
                    <Input
                        type="text"
                        name="student-email"
                        id="student-email"
                        defaultValue={email}
                    />
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label htmlFor="student-password">Password</S.Label>
                    <Input
                        type="password"
                        name="student-password"
                        id="student-password"
                        placeholder={placeholder}
                    />
                </S.InputGroup>
                <S.ButtonGroup>
                    <CancelButton type="button" onClick={() => closeModal()}>cancel</CancelButton>
                    <SuccessButton type="submit">confirm</SuccessButton>
                </S.ButtonGroup>
            </S.Form>
        </S.Section>
    )
}

export default StudentCardForm;