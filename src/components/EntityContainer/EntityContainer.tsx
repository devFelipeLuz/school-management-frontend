import type { ReactNode } from "react";
import { Container } from "./styles";

interface EntityContainerProps {
    children?: ReactNode;
}

function EntityContainer({ children }: EntityContainerProps) {

    return <Container>{children}</Container>

}

export default EntityContainer;