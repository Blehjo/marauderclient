import { styled } from "styled-components";

export const HomeContainer = styled.div`
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;
    background: black;
    height: 100%;
    // @media (max-width: 686px) {
    //     width: 100vw;
    // }
`;

export const ImageContainer = styled.div`
    margin-top: 1rem;
    position: relative;
`;

export const TextContainer = styled.div`
    position: absolute;
    font-size: 500%;
    text-align: center;
    top: 50%;
    width: 100%;
    word-wrap: break-word;
`;