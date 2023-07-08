import { styled } from "styled-components";

export const CrewContainer = styled.div`
    padding-top: 5rem;
    position: relative;
`;

export const PenContainer = styled.div`
    position: absolute;
    right: 2%;
    cursor: pointer;
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
`;

export const ChatForm = styled.div`
    padding: 1rem;
    position: absolute;
    top: 5rem;
    left: 22.5%;
    border: solid 1px white;
    width: 55%;
    height: 85vh;
    border-radius: 1rem;
    .form-control {
        background-color: black; 
        color: white;
    }
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
    padding-top: 7%;
`;