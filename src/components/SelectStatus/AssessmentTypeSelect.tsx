import type { Dispatch, SetStateAction } from "react";
import { StatusSelect } from "./styles";

interface Props {
    typeFilter?: string;
    setTypeFilter?: Dispatch<SetStateAction<string>>;
}

function AssessmentTypeSelect({ typeFilter, setTypeFilter }: Props) {

    return <StatusSelect value={typeFilter} onChange={(e) => setTypeFilter!(e.target.value)}>
                <option value="">Type</option>
                <option value="HOMEWORK">HOMEWORK</option>
                <option value="PROJECT">PROJECT</option>
                <option value="TEST">TEST</option>
            </StatusSelect>
}

export default AssessmentTypeSelect;