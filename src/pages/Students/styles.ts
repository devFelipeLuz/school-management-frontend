import styled from "styled-components";
import { CancelButton, DefaultButton, SuccessButton } from "../../components/Button/styles";

export const StudentsWrapper = styled.section`
  min-height: 100vh;
  max-height: 100%;
  background: linear-gradient(
    135deg,
    #0f172a 0%,
    #1e293b 50%,
    #334155 100%
  );
  color: white;
`

export const StudentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

export const MainContent = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  overflow-y: auto;
`

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
`

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  

  width: 100%;
  padding: 20px;
  gap: 8px; 
`

export const StudentList = styled.ul`
  width: 1366px;
  font-size: 16px;
  border: none;
  list-styled: none;
  padding: 20px;
  
  
  li {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr auto;
    background: rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    border-radius: 8px;
    padding: 8px;
    align-items: center;
    gap: 24px;


    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }
`

export const Title = styled.span`
  font-size: 14px;
  color: #ccc;
`

export const EditStudentButton = styled(DefaultButton)`
  width: 96px;
  height: 42px;

  background: #0e1116;
  color: #fff;

  &:hover {
    background-color: #181d25b7;
  }
`

export const DeactivateButton = styled(CancelButton)`
  width: 96px;
`

export const ActivateButton = styled(SuccessButton)`
  width: 96px;
`

export const ActiveTag = styled.span`
  color: #fff;
  background-color: darkgreen;
  border: none;
  border-radius: 8px;
  padding: 4px;
`

export const InactiveTag = styled.span`
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 8px;
  padding: 4px;
`