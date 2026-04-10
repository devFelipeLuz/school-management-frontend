import type { Dispatch, SetStateAction } from "react";
import { StatusSelect } from "./styles";

interface SelectStatusProps {
    activeFilter?: string;
    setActiveFilter?: Dispatch<SetStateAction<string>>;
}

function SelectStatus({ activeFilter, setActiveFilter }: SelectStatusProps) {

    return <StatusSelect value={activeFilter} onChange={(e) => setActiveFilter!(e.target.value)}>
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </StatusSelect>

}

export default SelectStatus;