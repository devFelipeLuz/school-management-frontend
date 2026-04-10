import type { ReactNode } from "react";
import { Container } from "./styles";

interface MainContentProps {
    children?: ReactNode
}

function MainContent({ children }: MainContentProps) {
    return <Container>{children}</Container>
}

export default MainContent;