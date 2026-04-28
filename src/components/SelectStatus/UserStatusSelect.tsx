import type { Dispatch, SetStateAction } from "react";
import { StatusSelect } from "./styles";

interface Props {
    activeFilter?: string;
    setActiveFilter?: Dispatch<SetStateAction<string>>;
}

function UserStatusSelect({ activeFilter, setActiveFilter }: Props) {

    return <StatusSelect value={activeFilter} onChange={(e) => setActiveFilter!(e.target.value)}>
                <option value="">Status</option>
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
            </StatusSelect>

}

export default UserStatusSelect;