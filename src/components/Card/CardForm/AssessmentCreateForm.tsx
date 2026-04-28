import type { Dispatch, SetStateAction } from "react";
import { searchAssignment, type Assignment } from "../../../services/assignmentService";
import { ButtonGroup, Form, FormSelect, InputGroup, Label, Section, Title } from "./styles";
import Input from "../../Input/Input";
import Autocomplete from "../../Autocomplete/Autocomplete";
import { CancelButton, SuccessButton } from "../../Button/styles";

interface Props {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;

    cardTitle?: string;
    placeholder?: string;

    assessmentTitle?: string;
    setAssessmentTitle?: Dispatch<SetStateAction<string>>;

    assessmentType?: string;
    setAssessmentType?: Dispatch<SetStateAction<string>>;

    assignmentId?: string;
    setAssignmentId?: Dispatch<SetStateAction<string>>;

    selectedAssignment: Assignment | null;
    setSelectedAssignment: Dispatch<SetStateAction<Assignment | null>>;
}

function AssessmentCreateForm({
    submit,
    closeModal,

    cardTitle,

    assessmentTitle,
    setAssessmentTitle = () => { },

    assessmentType,
    setAssessmentType = () => { },

    setAssignmentId = () => { },

    selectedAssignment,
    setSelectedAssignment = () => { }
}: Props) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{cardTitle}</Title>
                <InputGroup>
                    <Label>Title</Label>
                    <Input
                        value={assessmentTitle}
                        onChange={(e) => setAssessmentTitle(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Assignment</Label>
                    <Autocomplete
                        value={selectedAssignment}
                        onChange={(item) => {
                            setSelectedAssignment(item);
                            setAssignmentId?.(item?.id ?? "");
                        }}
                        fetchFn={searchAssignment}
                        getLabel={(item) => String(item.subjectName)}
                        placeholder="Search assignment by subject..."
                    />
                </InputGroup>

                <FormSelect
                    value={assessmentType}
                    onChange={(e) => setAssessmentType(e.target.value)}
                >
                    <option value="HOMEWORK">HOMEWORK</option>
                    <option value="PROJECT">PROJECT</option>
                    <option value="TEST">TEST</option>
                </FormSelect>

                <ButtonGroup>
                    <CancelButton
                        type="button"
                        onClick={closeModal}>
                        cancel
                    </CancelButton>
                    <SuccessButton type="submit">
                        confirm
                    </SuccessButton>
                </ButtonGroup>


            </Form>
        </Section>
    )

}

export default AssessmentCreateForm;