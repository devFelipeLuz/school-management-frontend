import type { Dispatch, SetStateAction } from "react";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import { CancelButton, SuccessButton } from "../../Button/styles";

interface ProfessorCardFormProps {
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

function ProfessorCardForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { },
    email,
    setEmail = () => { },
    password,
    setPassword = () => { },
    placeholder }: ProfessorCardFormProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label htmlFor="professor-name">Name</Label>
                    <Input
                        type="text"
                        name="professor-name"
                        id="professor-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="professor-email">Email</Label>
                    <Input
                        type="text"
                        name="professor-email"
                        id="professor-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="professor-password">Password</Label>
                    <Input
                        type="password"
                        name="professor-password"
                        id="professor-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={placeholder}
                    />
                </InputGroup>

                <ButtonGroup>
                    <CancelButton
                        type="button"
                        onClick={closeModal}>
                        cancel
                    </CancelButton>
                    <SuccessButton
                        type="submit">
                        confirm
                    </SuccessButton>
                </ButtonGroup>
            </Form>
        </Section>
    )
}

export default ProfessorCardForm;