import type { Dispatch, SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface EnrollmentCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    studentId: string;
    setStudentId: Dispatch<SetStateAction<string>>;
    classroomId: string;
    setClassroomId: Dispatch<SetStateAction<string>>;
}

function EnrollmentForm({
    submit,
    closeModal,
    title,
    studentId,
    setStudentId = () => { },
    classroomId,
    setClassroomId = () => { } }: EnrollmentCardFormProps) {

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
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="classroom-id">Classroom_ID</Label>
                    <Input
                        type="text"
                        name="classroom-id"
                        id="classroom-id"
                        value={classroomId}
                        onChange={(e) => setClassroomId(e.target.value)}
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

export default EnrollmentForm;