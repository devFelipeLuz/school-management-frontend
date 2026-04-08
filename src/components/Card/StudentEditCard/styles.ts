import styled from "styled-components";

export const CardContainer = styled.div`
    width: 480px;
    height: 480px;

    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.12);

    border: none;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);

    z-index: 11;
    overflow: hidden;

    padding: 40px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;

    form {
        width: 100%;
        height: 100%;
    }

    h1 {
        text-align: center;
        color: #fff;
        margin-bottom: 16px;
        font-size: 24px;
    }

    .input-group {
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 4px;
            color: #fff;
        }

        input {
            width: 100%;
            margin-bottom: 16px;
            height: 32px;
            outline: none;
        }
    }

    .button-group {
        display: flex;
        gap: 16px;
        margin-top: auto;
    }
`