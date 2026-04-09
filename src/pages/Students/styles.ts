import styled from "styled-components";
import { CancelButton, DefaultButton, NewStudentButton, SuccessButton } from "../../components/Button/styles";
import { LargeInput } from "../../components/Input/styles";

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
  max-width: 1680px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
  border: none;
  border-radius: 8px;

  width: 100%;
  padding: 8px;
`
export const InputGroup = styled.div`
  display: flex;
  width: 50%;
  gap: 8px;

  ${LargeInput} {
    width: 50%;
  }
`

export const StatusSelect = styled.select`
  display: flex;
  text-align: center;
  width: 120px;
  height: 48px;

  border: none;
  border-radius: 8px;
  outline: none;

  font-size: 16px;

  color: #fff;
  background-color: #0e1116;
`

export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const StudentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;

  width: 100%;
  padding: 14px 20px;
  border-radius: 8px;

  background: rgba(0, 0, 0, 0.2);

  > * {
    justify-self: center;
  }
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 8px;

  span {
    justify-self: center;
    font-weight: 600;
  }
`

export const EditStudentButton = styled(DefaultButton)`
  width: 96px;
  height: 32px;

  background: #0e1116;
  color: #fff;

  &:hover {
    background-color: #181d25b7;
  }
`

export const DeactivateButton = styled(CancelButton)`
  width: 96px;
  height: 32px;
`

export const ActivateButton = styled(SuccessButton)`
  width: 96px;
  height: 32px;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`

export const ActiveTag = styled.span`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 72px;
  height: 32px;
  padding: 0 12px;

  color: #fff;
  background-color: darkgreen;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`

export const InactiveTag = styled.span`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 72px;
  height: 32px;
  padding: 0 12px;

  color: #fff;
  background-color: red;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`