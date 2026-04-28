import type { Dispatch, SetStateAction } from "react";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import { CancelButton, SuccessButton } from "../../Button/styles";
import { searchProfessor, type Professor } from "../../../services/professorService";
import { searchSubject, type Subject } from "../../../services/subjectService";
import { searchClassroom, type Classroom } from "../../../services/classroomService";
import Autocomplete from "../../Autocomplete/Autocomplete";

interface AssignmentFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    placeholder?: string;

    selectedProfessor: Professor | null;
    setSelectedProfessor: Dispatch<SetStateAction<Professor | null>>;
    professorId?: string;
    setProfessorId?: Dispatch<SetStateAction<string>>;

    selectedSubject: Subject | null;
    setSelectedSubject: Dispatch<SetStateAction<Subject | null>>;
    subjectId?: string;
    setSubjectId?: Dispatch<SetStateAction<string>>;

    selectedClassroom: Classroom | null;
    setSelectedClassroom: Dispatch<SetStateAction<Classroom | null>>;
    classroomId?: string;
    setClassroomId?: Dispatch<SetStateAction<string>>;
}

function AssignmentForm({
    submit,
    closeModal,
    title,

    selectedProfessor,
    setSelectedProfessor = () => { },
    setProfessorId = () => { },

    selectedSubject,
    setSelectedSubject = () => { },
    setSubjectId = () => { },

    selectedClassroom,
    setSelectedClassroom = () => { },
    setClassroomId = () => { } }: AssignmentFormProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label>Professor</Label>
                    <Autocomplete
                        value={selectedProfessor}
                        onChange={(item) => {
                            setSelectedProfessor(item);
                            setProfessorId?.(item?.id ?? "");
                        }}
                        fetchFn={searchProfessor}
                        getLabel={(item) => String(item.name)}
                        placeholder="Search professor..."
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Subject</Label>
                    <Autocomplete
                        value={selectedSubject}
                        onChange={(item) => {
                            setSelectedSubject(item);
                            setSubjectId?.(item?.id ?? "");
                        }}
                        fetchFn={searchSubject}
                        getLabel={(item) => String(item.name)}
                        placeholder="Search subject..."
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="classroom-id">Classroom</Label>
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