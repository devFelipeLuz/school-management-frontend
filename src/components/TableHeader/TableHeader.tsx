import type { ReactNode } from "react";
import { DefaultHeader } from "./styles";

interface TableHeaderProps {
    children: ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {

    return <DefaultHeader>{children}</DefaultHeader>
}

export default TableHeader;