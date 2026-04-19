import type { Dispatch, SetStateAction } from "react";
import { CancelButton, SuccessButton } from "../../Button/styles";
import Input from "../../Input/Input";
import { ButtonGroup, Form, InputGroup, Label, Section, Title } from "./styles";

interface SchoolyearCardFormProps {
    submit: (event: React.FormEvent) => void;
    closeModal: () => void;
    title?: string;
    year?: string;
    setYear?: Dispatch<SetStateAction<string>>;
}

function SchoolyearCardForm({
    submit,
    closeModal,
    title,
    year,
    setYear = () => { } }: SchoolyearCardFormProps) {

    return (
        <Section>
            <Form onSubmit={submit}>
                <Title>{title}</Title>
                <InputGroup>
                    <Label htmlFor="schoolyear-year">Year</Label>
                    <Input
                        type="text"
                        name="schoolyear-year"
                        id="schoolyear-year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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

export default SchoolyearCardForm;