import styled from "styled-components";

export const DefaultTag = styled.span`
    justify-self: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 72px;
    height: 32px;
    padding: 0 12px;

    color: #fff;
    background-color: blue;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
`

export const ActiveTag = styled(DefaultTag)`
  background-color: darkgreen;
`

export const InactiveTag = styled(DefaultTag)`
  background-color: red;
`