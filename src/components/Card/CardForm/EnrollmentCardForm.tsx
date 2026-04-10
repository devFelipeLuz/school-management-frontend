import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface EnrollmentCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    studentId?: string;
    schoolyearId?: string;
    classroomId?: string;
}

function EnrollmentCardForm({ submit, closeModal, title, studentId, classroomId }: EnrollmentCardFormProps) {
    return (

        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label htmlFor="student-id">Student_ID</Label>
                    <Input
                        type="text"
                        name="student-id"
                        id="student-id"
                        defaultValue={studentId}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="classroom-id">Classroom_ID</Label>
                    <Input
                        type="text"
                        name="classroom-id"
                        id="classroom-id"
                        defaultValue={classroomId}
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

export default EnrollmentCardForm;