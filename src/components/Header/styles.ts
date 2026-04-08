import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 70px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Brand = styled.h1`
  font-size: 20px;
  font-weight: 700;
  cursor: default;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 12px;

  div {
    display: flex;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.1s ease;

    &:hover {
      background: #fff;
      color: rgba(15, 23, 42, 0.95);
      border: none;
      border-radius: 8px;
    }
  }

  a {
    text-decoration: none;
    font-weight: bold;
    padding-left: 4px;
  }
`;