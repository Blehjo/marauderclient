import { styled } from "styled-components";

export const FixedBox = styled.div`
    position: fixed;
    bottom: 2%;
    right: 1%;
    padding-top: .2rem;
    text-align: center;
    width: 20rem;
    height: 5%;
    z-index: 5;
    @media (max-width: 686px) {
        width: 90%;
        right: 5%;
    }
`;

export const OpenedBox = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, .75);
    bottom: 2%;
    right: 1%;
    padding-top: .2rem;
    border-radius: .5rem .5rem .5rem .5rem;
    border: white 1px solid;
    text-align: center;
    width: 20rem;
    height: 80%;
    z-index: 5;
    @media (max-width: 686px) {
        width: 90%;
        right: 5%;
    }
`;

export const ContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: .1rem;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
`;