import { styled } from "styled-components";

export const grid = 8;
export const borderRadius = 2;

export const ConstantsContainer = styled.div`
    margin: ${grid}px;
    display: flex;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: orange;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: blue;
  }
`;

export const TitleContainer = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;