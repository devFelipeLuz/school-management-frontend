import styled from "styled-components";

export const DefaultHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 8px;

  span {
    justify-self: center;
    font-weight: 600;
  }
`

export const ProfessorHeader = styled(DefaultHeader)`
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
`

export const SubjectHeader = styled(DefaultHeader)`
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
`

export const AssignmentHeader = styled(DefaultHeader)`
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
`