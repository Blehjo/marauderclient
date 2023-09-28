import { styled } from "styled-components";

export const CrewContainer = styled.div`
    padding-top: 5rem;
    position: relative;
`;

export const PenContainer = styled.div`
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;

export const TextFitContainer = styled.div`
    &:hover {
        color: gray;
    }
`;

export const CrewMemberContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 0%;
    height: 85vh;
    width: 20%;
    overflow-y: auto;
    padding: 1rem;
    border: solid 1px white;
    border-radius: 1rem;
    background: black;
    @media (max-width: 1100px) {
        position: absolute;
        height: 25vh;
        top: 5rem;
        width: 48%;
        left: 0%;
    }
    @media (max-width: 686px) {
        position: static;
        width: 100%;
        height: 25vh;
    }
`;

export const ChatForm = styled.div`
    padding: 1rem;
    position: absolute;
    top: 5rem;
    left: 22.5%;
    height: 85vh;
    width: 55%;
    border: solid 1px white;
    border-radius: 1rem;
    @media (max-width: 1100px) {
        position: absolute;
        width: 100%;
        height: 55vh;
        top: 40vh;
        left: 0%;
    }
    @media (max-width: 686px) {
        position: static;
        margin-top: 1rem;
        width: 100%;
        height: 60vh;
        margin-bottom: 4.5rem;
    }
    
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ChatsContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 80%;
    height: 85vh;
    width: 20%;
    overflow-y: auto;
    padding: 1rem;
    border: solid 1px white;
    border-radius: 1rem;
    background: black;
    @media (max-width: 1100px) {
        position: absolute;
        width: 48%;
        top: 5rem;
        left: 52%;
        height: 25vh;
    }
    @media (max-width: 686px) {
        position: static;
        margin-top: 1rem;
        width: 100%;
        height: 25vh;
    }
`;

export const ChatBox = styled.div`
    border: solid 1px green;
    border-radius: .5rem;
    padding: .5rem;
    margin: 1rem .5rem 0rem .5rem;

`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: absolute;
    width: 100%;
    text-align: start;
    left: 0%;
    padding-top: 8%;
    overflow-y: auto;
`;