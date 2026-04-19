import type { Dispatch, SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import * as S from "./styles";

interface StudentCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
    email?: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    password?: string;
    setPassword?: Dispatch<SetStateAction<string>>;
    placeholder?: string;
}

function StudentForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { },
    email,
    setEmail = () => { },
    password,
    setPassword = () => { },
    placeholder }: StudentCardFormProps) {

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label htmlFor="student-email">Email</S.Label>
                    <Input
                        type="text"
                        name="student-email"
                        id="student-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label htmlFor="student-password">Password</S.Label>
                    <Input
                        type="password"
                        name="student-password"
                        id="student-password"
                        placeholder={placeholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default StudentForm;