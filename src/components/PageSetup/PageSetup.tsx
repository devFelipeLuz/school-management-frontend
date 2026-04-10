import type { ReactNode } from "react";
import Container from "../Container/Container";
import EntityContainer from "../EntityContainer/EntityContainer";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";
import SectionWrapper from "../SectionWrapper/SectionWrapper";
import Sidebar from "../Sidebar/Sidebar";

interface PageSetupProps {
    children?: ReactNode;
}

function PageSetup({ children }: PageSetupProps) {

    return (
        <SectionWrapper>
            <Header />
            <EntityContainer>
                <Sidebar />
                <MainContent>
                    <Container>{children}</Container>
                </MainContent>
            </EntityContainer>
        </SectionWrapper>
    )
}

export default PageSetup;