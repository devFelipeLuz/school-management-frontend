import type { Dispatch, SetStateAction } from "react";
import { StatusSelect } from "./styles";

interface RoleSelectProps {
    roleFilter?: string;
    setRoleFilter?: Dispatch<SetStateAction<string>>;
}

function RoleSelect({ roleFilter, setRoleFilter }: RoleSelectProps) {

    return <StatusSelect value={roleFilter} onChange={(e) => setRoleFilter!(e.target.value)} name="user-role" id="user-role">
                <option value="">Role</option>
                <option value="ADMIN">Admin</option>
                <option value="STUDENT">Student</option>
                <option value="PROFESSOR">Professor</option>
                <option value="COORDINATOR">Coordinator</option>
            </StatusSelect>
}

export default RoleSelect;