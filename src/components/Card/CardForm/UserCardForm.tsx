import { useState, type Dispatch, type SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, SelectRole, Title } from "./styles";


interface UserCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    email?: string;
    password?: string;
    placeholder?: string;
}

function UserCardForm({ submit, closeModal, title, email, password, placeholder }: UserCardFormProps) {

    const [role, setRole] = useState("ADMIN");

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
                        defaultValue={email}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                        type="password"
                        name="user-password"
                        id="user-password"
                        placeholder={placeholder}
                        defaultValue={password}
                    />
                </InputGroup>

                <SelectRole value={role} onChange={(e) => setRole!(e.target.value)} name="user-role" id="user-role">
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

export default UserCardForm;