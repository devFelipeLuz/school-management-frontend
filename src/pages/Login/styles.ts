import styled, { keyframes } from "styled-components";
import paisagem from "../../images/paisagem.png";

const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
`

export const Section = styled.section`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(${paisagem});
    background-size: 120% 120%;
    background-repeat: no-repeat;

    animation: ${gradientAnimation} 15s ease infinite;
`

export const GlassContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 380px;
    margin: 20px;
    padding: 40px;
    
    border-radius: 20px;
    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);
    z-index: 10;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
        transform: skewX(-15deg);
        transition: 0.5s;
        pointer-events: none;
    }

    &:hover::before {
        left: 120%;
    }
`;

export const Title = styled.h2`
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 40px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const InputGroup = styled.div`
    position: relative;
    margin-bottom: 30px;
`;

export const Label = styled.label`
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    pointer-events: none;
    transition: all 0.3s ease;
`;

export const GlassInput = styled.input`
    width: 100%;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    outline: none;
    border-radius: 35px;
    font-size: 16px;
    color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    &:focus + ${Label}, 
    &:valid + ${Label} {
        top: 0;
        left: 15px;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 10px;
        color: #fff;
    }
`;

export const RememberForgotContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);

    label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    input {
        margin-right: 8px;
        accent-color: #fff;
    }

    a {
        color: #fff;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const LoginButton = styled.button`
    width: 100%;
    padding: 15px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    outline: none;
    border-radius: 35px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    &:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
`;
