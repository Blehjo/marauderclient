import { styled } from "styled-components";

export const FixedBox = styled.div`
    position: fixed;
    background: black;
    bottom: 0%;
    right: 1%;
    border-radius: 1rem 1rem 0rem 0rem;
    border: white 1px solid;
    text-align: center;
    width: 20%;
    height: 5%;
    z-index: 5;
`;

export const OpenedBox = styled.div`
    position: fixed;
    background: black;
    bottom: 0%;
    right: 1%;
    border-radius: 1rem 1rem 0rem 0rem;
    border: white 1px solid;
    text-align: center;
    width: 20%;
    height: 80%;
    z-index: 3;
`;

export const ContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: .1rem;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
`;