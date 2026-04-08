import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import CountCard from "../../components/Card/CountCard/CountCard";

import {
  DashboardWrapper,
  MainLayout,
  Content,
  CardsGrid
} from "./styles";
import { useDashboardCounts } from "../../hooks/useDashboardCounts";

function DashboardPage() {
  const {counts, loading, error} = useDashboardCounts();
  
  /*if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>*/

  return (
    <DashboardWrapper>
      <Header />

      <MainLayout>
        <Sidebar />

        <Content>
          <CardsGrid>
            <CountCard title="Students" value={counts.students} />
            <CountCard title="Professors" value={counts.professors} />
            <CountCard title="Classrooms" value={counts.classrooms} />
            <CountCard title="Subjects" value={counts.subjects} />
            <CountCard title="Enrollments" value={counts.enrollments} />
            <CountCard title="Assessments" value={counts.assessments} />
          </CardsGrid>
        </Content>
      </MainLayout>
    </DashboardWrapper>
  );
}

export default DashboardPage;