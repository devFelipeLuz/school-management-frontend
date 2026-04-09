import styled from "styled-components";

export const DefaultInput = styled.input`
    width: 100%;
    height: 36px;

    padding: 8px;

    border: none;
    border-radius: 8px;
    outline: none;

    font-size: 16px;
`

export const LargeInput = styled(DefaultInput)`
    display: flex;

    height: 48px;
    width: auto;

    margin-bottom: 0;
    text-align: center;
`