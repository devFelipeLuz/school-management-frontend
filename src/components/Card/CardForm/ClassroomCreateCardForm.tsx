import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";
import Autocomplete from "../../Autocomplete/Autocomplete";
import { useState, type Dispatch, type SetStateAction } from "react";

interface ClassroomCardFromProps {
    submit: (e: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    name?: string;
    setName?: Dispatch<SetStateAction<string>>;
    schoolyearId?: string;
    setSchoolyearId?: Dispatch<SetStateAction<string>>;
}

function ClassroomCreateCardForm({
    submit,
    closeModal,
    title,
    name,
    setName = () => { },
    schoolyearId,
    setSchoolyearId }: ClassroomCardFromProps) {

    const [selectedYear, setSelectedYear] = useState<any>(null);

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
                    <Autocomplete
                        value={selectedYear}
                        onChange={(item) => {
                            setSelectedYear(item);
                            setSchoolyearId?.(item?.id ?? null);
                        }}
                        url="http://localhost:8080/school-years"
                        queryParamName="year"
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
        </Section>
    )
}

export default ClassroomCreateCardForm;