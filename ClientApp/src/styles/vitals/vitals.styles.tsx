import { styled } from "styled-components";

export const VitalsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem auto auto auto;
    border-radius: .5rem;
    background: #212529;
    height: 40%;
    .subtitle {
        margin: 0rem 1rem 0rem 2rem;
        text-align: left;
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
    margin: 1rem 1rem 0rem 2rem;
    text-align: left;
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem;
    text-align: center;
    justify-content: space-between;
    padding-bottom: 4rem;
`;

export const CardContainer = styled.a`
    text-decoration: none;
    color: white;
    position: relative;
    border-radius: .5rem;
    border: 1px solid white;
    padding: 1rem;
    margin: 1rem;
    word-wrap: break-word;
    width: 15%;
    height: 5rem;
    cursor: pointer;
    &:hover {
        color: gray;
        background: rgb(255,83,73);
        border: 1px solid transparent;
    }
    @media (max-width: 951px) {
        width: 17.5rem;
    }
    @media (max-width: 935px) {
        width: 17rem;
    }
    @media (max-width: 919px) {
        width: 16.5rem;
    }
    @media (max-width: 903px) {
        width: 16rem;
    }
    @media (max-width: 902px) {
        width: 40%;
    }
`;