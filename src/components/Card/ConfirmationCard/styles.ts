import styled from "styled-components";

export const CardContainer = styled.div`
    width: 480px;
    height: 240px;
    background-color: rgb(30, 30, 30);

    border: none;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);

    z-index: 11;
    overflow: hidden;

    padding: 40px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
`

export const CartTitle = styled.h1`
    text-align: center;
    color: #fff;
    margin-bottom: 16px;
    font-size: 24px;
    cursor: default;
`

export const ButtonGroup = styled.div`
    display: flex;
    bottom: 0;
    gap: 16px;
    margin-top: auto;
`