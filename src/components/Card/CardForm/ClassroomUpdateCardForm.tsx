import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface ClassroomCardFromProps {
    submit: (e: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    maxCapacity?: number;
}

function ClassroomUpdateCardForm({ submit, closeModal, title, name, maxCapacity }: ClassroomCardFromProps) {

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
                        defaultValue={name}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>New Max Capacity</Label>
                    <Input 
                    type="text"
                    name="classroom-new-capacity"
                    id="classroom-new-capacity"
                    defaultValue={maxCapacity}
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