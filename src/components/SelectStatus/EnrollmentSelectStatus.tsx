import type { Dispatch, SetStateAction } from "react";
import { StatusSelect } from "./styles";

interface SelectStatusProps {
    activeFilter?: string;
    setActiveFilter?: Dispatch<SetStateAction<string>>;
}

function EnrollmentSelectStatus({ activeFilter, setActiveFilter }: SelectStatusProps) {

    return <StatusSelect value={activeFilter} onChange={(e) => setActiveFilter!(e.target.value)}>
                <option value="">All</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="FINISHED">FINISHED</option>
                <option value="CANCELED">CANCELED</option>
            </StatusSelect>

}

export default EnrollmentSelectStatus;