import { styled } from "styled-components";

export const CommunityContainer = styled.div`
    position: relative;
    padding-top: 5rem;
`;

export const ChatsContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 80%;
    height: 75vh;
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

export const CrewMemberContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 0%;
    height: 75vh;
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
    height: 75vh;
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
        margin-bottom: 3.5rem;
    }
    
`;