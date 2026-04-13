import type { Dispatch, SetStateAction } from "react";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import Input from "../../Input/Input";
import { CancelButton, SuccessButton } from "../../Button/styles";

interface SubjectCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
    placeholder?: string;
}

function SubjectCardForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { }, }: SubjectCardFormProps) {


    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label htmlFor="subject-name">Name</Label>
                    <Input
                        type="text"
                        name="subject-name"
                        id="subject-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

export default SubjectCardForm;