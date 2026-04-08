import styled from "styled-components";

export const Section = styled.section`
    position: relative;
    max-width: 480px;
    width: 100%;
    height: 480px;
    padding: 40px;

    border-radius: 20px;
    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);
    z-index: 11;
    overflow: hidden;

    display: flex;
    flex-direction: column;
`

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const Title = styled.h1`
    text-align: center;
    color: #fff;
    margin-bottom: 48px;
    font-size: 24px;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-top: auto;
`

export const Label = styled.label`
    margin-bottom: 4px;
    color: #fff;
`