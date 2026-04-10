import type { ReactNode } from "react"
import { Wrapper } from "./styles";

interface SectionWrapperProps {
    children?: ReactNode;
}

function SectionWrapper({ children }: SectionWrapperProps) {

    return <Wrapper>{children}</Wrapper>
}

export default SectionWrapper;