import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, CreateClassroomSection, Form, InputGroup, Label, Title } from "./styles";
import Autocomplete from "../../Autocomplete/Autocomplete";
import { type Dispatch, type SetStateAction } from "react";
import { searchSchoolYears, type Schoolyears } from "../../../services/schoolyearService";

interface ClassroomCardFromProps {
    submit: (e: React.FormEvent) => void;
    closeModal: () => void;

    title?: string;

    name?: string;
    setName?: Dispatch<SetStateAction<string>>;

    schoolyearId?: string;
    setSchoolyearId?: Dispatch<SetStateAction<string>>;

    selectedSchoolYear: Schoolyears | null;
    setSelectedSchoolYear: Dispatch<SetStateAction<Schoolyears | null>>;
}

function ClassroomCreateCardForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { },
    setSchoolyearId = () => { },
    selectedSchoolYear,
    setSelectedSchoolYear = () => { } }: ClassroomCardFromProps) {

    return (
        <CreateClassroomSection>
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
                    <Autocomplete
                        value={selectedSchoolYear}
                        onChange={(item) => {
                            setSelectedSchoolYear(item);
                            setSchoolyearId?.(item?.id ?? "");
                        }}
                        fetchFn={searchSchoolYears}
                        getLabel={(item) => String(item.year)}
                        placeholder="Search year..."
                    />
                </InputGroup>

                <ButtonGroup>
                    <CancelButton
                        type="button"
                        onClick={() => closeModal()}>cancel</CancelButton>
                    <SuccessButton type="submit">confirm</SuccessButton>
                </ButtonGroup>

            </Form>
        </CreateClassroomSection>
    )
}

export default ClassroomCreateCardForm;