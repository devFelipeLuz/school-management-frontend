import styled from "styled-components"
import { LargeInput } from "../../components/Input/styles"

export const SchoolyearContainer = styled.div`
    display: flex;
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

export const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 8px;

    span {
        justify-self: center;
        font-weight: 600;
    }
`

export const SchoolyearList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const SchoolyearRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;

    width: 100%;
    padding: 14px 20px;
    border-radius: 8px;

    background: rgba(0, 0, 0, 0.2);

    > * {
        justify-self: center;
    } 
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`