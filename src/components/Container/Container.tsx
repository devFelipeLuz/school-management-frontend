import type { ReactNode } from "react";
import { Wrapper } from "./styles";

interface ContainerProps {
    children?: ReactNode;
}

function Container({ children }: ContainerProps) {

    return <Wrapper>{children}</Wrapper>
}

export default Container;