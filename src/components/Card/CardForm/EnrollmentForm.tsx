import type { Dispatch, SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import { searchStudent, type Students } from "../../../services/studentService";
import { searchClassroom, type Classroom } from "../../../services/classroomService";
import Autocomplete from "../../Autocomplete/Autocomplete";

interface EnrollmentCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;

    title?: string;

    studentId: string;
    setStudentId: Dispatch<SetStateAction<string>>;

    selectedStudent: Students | null;
    setSelectedStudent: Dispatch<SetStateAction<Students | null>>;

    classroomId: string;
    setClassroomId: Dispatch<SetStateAction<string>>;

    selectedClassroom: Classroom | null;
    setSelectedClassroom: Dispatch<SetStateAction<Classroom | null>>;
}

function EnrollmentForm({
    submit,
    closeModal,
    title,
    selectedStudent,
    setSelectedStudent = () => { },
    setStudentId = () => { },
    selectedClassroom,
    setSelectedClassroom = () => { },
    setClassroomId = () => { } }: EnrollmentCardFormProps) {

    return (

        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label>Student</Label>
                    <Autocomplete
                        value={selectedStudent}
                        onChange={(item) => {
                            setSelectedStudent(item);
                            setStudentId?.(item?.id ?? "");
                        }}
                        fetchFn={searchStudent}
                        getLabel={(item) => String(item.name)}
                        placeholder="Search student..."
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Classroom</Label>
                    <Autocomplete
                        value={selectedClassroom}
                        onChange={(item) => {
                            setSelectedClassroom(item);
                            setClassroomId?.(item?.id ?? "");
                        }}
                        fetchFn={searchClassroom}
                        getLabel={(item) => String(item.name)}
                        placeholder="Search classroom..."
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