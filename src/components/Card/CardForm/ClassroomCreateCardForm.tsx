import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface ClassroomCardFromProps {
    submit: (e: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    schoolyearId?: string;
}

function ClassroomCreateCardForm({ submit, closeModal, title, name, schoolyearId }: ClassroomCardFromProps) {

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
                    <Label>School_Year_ID</Label>
                    <Input 
                    type="text"
                    name="schoolyear-id"
                    id="schoolyear-id"
                    defaultValue={schoolyearId}
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

export default ClassroomCreateCardForm;