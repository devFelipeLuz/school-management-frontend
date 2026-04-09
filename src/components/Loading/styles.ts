import styled, { keyframes } from "styled-components";

const rotate = keyframes`

from {
    transform: rotate(0deg);
}

to {
    transform: rotate(360deg);
}`

export const SpinnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: transparent;
`

export const CircularSpinner = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: relative;

    background: conic-gradient(
        from 0deg,
        transparent 0%,
        rgba(0, 255, 255, 0.1) 40%, /* Azul Ciano bem fraco */
        rgba(0, 212, 255, 1) 100%   /* Azul Neon Vibrante */
    );

    mask: radial-gradient(farthest-side, transparent calc(100% - 6px), orange 0);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), black 0);

    box-shadow: 0 0 15px rgba(0, 212, 255, 0.5),
                0 0 5px rgba(0, 212, 255, 0.8);

    &::after {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        border-radius: 50%;
    
        mask: radial-gradient(farthest-side, transparent calc(100% - 7px), orange 0);
        -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 7px), black 0);

        box-shadow: inset 0 0 10px rgba(0, 212, 255, 0.6);
        pointer-events: none;
  }

    animation: ${rotate} 0.8s linear infinite;
`

export const LoadingMessage = styled.span`
    color: rgba(0, 212, 255, 1); 
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 2px;
    text-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
    display: flex;
    align-items: center;
`