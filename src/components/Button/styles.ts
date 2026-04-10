import styled from "styled-components";

export const DefaultButton = styled.button`
    display: flex;
    text-align:center;
    justify-content: center;
    align-items: center;

    padding: 8px 12px;
    width: 100%;

    border: none;
    border-radius: 8px;
  
    font-weight: bold;
    font-size: 14px;

    cursor: pointer;

    transition: background-color 0.3s ease;
`

export const CancelButton = styled(DefaultButton)`
    background-color: red;
    color: #fff;
    height: 42px;

    &:hover {
        background-color: rgb(255, 100, 100);
    }
`

export const SuccessButton = styled(DefaultButton)`
    background-color: darkgreen;
    color: #fff;

    height: 42px;

    &:hover {
        background-color: green;
    }
`

export const NewEntityButton = styled(DefaultButton)`
    height: 48px;
    width: auto;
    padding: 24px;

    border: none;
    outline: none;

    background: darkgreen;
    color: #fff;

    font-size: 16px;

    &:hover {
      background: green;
    }
`

export const EditButton = styled(DefaultButton)`
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