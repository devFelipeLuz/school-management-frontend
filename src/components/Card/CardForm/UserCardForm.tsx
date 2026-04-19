import { type Dispatch, type SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, SelectRole, Title } from "./styles";


interface UserFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    email?: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    password?: string;
    setPassword?: Dispatch<SetStateAction<string>>;
    role?: string;
    setRole?: Dispatch<SetStateAction<string>>;
    placeholder?: string;
}

function UserForm({
    submit,
    closeModal,
    title,
    email,
    setEmail = () => { },
    password,
    setPassword = () => { },
    role,
    setRole = () => { },
    placeholder }: UserFormProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>

                <InputGroup>
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                        type="text"
                        name="user-email"
                        id="user-email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                        type="password"
                        name="user-password"
                        id="user-password"
                        placeholder={placeholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>

                <SelectRole value={role} onChange={(e) => setRole(e.target.value)} name="user-role" id="user-role">
                    <option value="ADMIN">Admin</option>
                    <option value="STUDENT">Student</option>
                    <option value="PROFESSOR">Professor</option>
                    <option value="COORDINATOR">Coordinator</option>
                </SelectRole>

                <ButtonGroup>
                    <CancelButton type="button" onClick={() => closeModal()}>cancel</CancelButton>
                    <SuccessButton type="submit">confirm</SuccessButton>
                </ButtonGroup>
            </Form>
        </Section>
    )
}

export default UserForm;