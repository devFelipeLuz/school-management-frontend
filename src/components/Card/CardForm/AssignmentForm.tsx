import type { Dispatch, SetStateAction } from "react";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import { CancelButton, SuccessButton } from "../../Button/styles";

interface AssignmentFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    placeholder?: string;
    professorId?: string;
    setProfessorId?: Dispatch<SetStateAction<string>>;
    subjectId?: string;
    setSubjectId?: Dispatch<SetStateAction<string>>;
    classroomId?: string;
    setClassroomId?: Dispatch<SetStateAction<string>>;
}

function AssignmentForm({
    submit,
    closeModal,
    title,
    professorId,
    setProfessorId = () => { },
    subjectId,
    setSubjectId = () => { },
    classroomId,
    setClassroomId = () => { } }: AssignmentFormProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label htmlFor="professor-id">Professor_ID</Label>
                    <Input
                        type="text"
                        name="professor-id"
                        id="professor-id"
                        value={professorId}
                        onChange={(e) => setProfessorId(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="subject-id">Subject_ID</Label>
                    <Input
                        type="text"
                        name="subject-id"
                        id="subject-id"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
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

export default AssignmentForm;