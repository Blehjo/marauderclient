import { styled } from "styled-components";

export const VitalsContainer = styled.div`
    margin: 5rem auto auto auto;
    border-radius: .5rem;
    background: #212529;
    height: 40%;
    p {
        color:#fff;
        padding: 0rem 5rem 0rem 5rem;
    }
`;

export const CardsContainer = styled.div`
    margin: 5rem auto auto auto;
    padding: 3rem;
    border-radius: .5rem;
    background: #212529;
`;

export const InfoContainer = styled.div`
    font-size: 200%;
    padding: 3rem 5rem 0rem 5rem;
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    margin-left: 5rem;
    margin-right: 5rem;
    padding-bottom: 4rem;
`;

export const CardContainer = styled.div`
    border-radius: .5rem;
    border: 1px solid white;
    padding: 1rem;
    margin-right: 1rem;
    width: 20%;
    height: 20%
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;