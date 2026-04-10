import type { ReactNode } from "react";
import { DefaultTag } from "./styles";

interface TagProps {
    children?: ReactNode;
}

function Tag({children}: TagProps) {

    return <DefaultTag>{children}</DefaultTag>

}

export default Tag;