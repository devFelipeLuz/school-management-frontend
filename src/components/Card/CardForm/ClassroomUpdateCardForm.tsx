import type { Dispatch, SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface ClassroomCardFromProps {
    submit: (e: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
    capacity?: number;
    setCapacity?: Dispatch<SetStateAction<number>>;
}

function ClassroomUpdateCardForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { },
    capacity,
    setCapacity = () => { } }: ClassroomCardFromProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label>Classroom</Label>
                    <Input
                        type="text"
                        name="classroom-name"
                        id="classroom-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>New Max Capacity</Label>
                    <Input
                        type="text"
                        name="classroom-new-capacity"
                        id="classroom-new-capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                    />
                </InputGroup>

                <ButtonGroup>
                    <CancelButton type="button" onClick={() => closeModal()}>cancel</CancelButton>
                    <SuccessButton type="submit">confirm</SuccessButton>
                </ButtonGroup>

            </Form>
        </Section>
    )
}

export default ClassroomUpdateCardForm;