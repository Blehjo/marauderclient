import { styled } from "styled-components";

export const MessageContainer = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
`;  

export const ListContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 5%;
    height: 85vh;
    width: 25%;
    overflow-y: auto;
    padding: 1rem;
    border: solid 1px white;
    border-radius: 1rem;
    background: black;
`;

export const MessageForm = styled.div`
    padding: 1rem;
    position: absolute;
    top: 5rem;
    left: 35%;
    border: solid 1px white;
    width: 60%;
    height: 85vh;
    border-radius: 1rem;
    .form-control {
        background-color: black; 
        color: white;
    }
`;

export const InputContainer = styled.div`
    position: absolute;
    bottom: 0rem;
    width: 100%;
`;

export const TextContainer = styled.div`
    border: solid 1px blue;
    border-radius: .3rem;
    padding: .2rem;
    margin: .5rem;
    width: 100%;
    text-align: center;
`;

export const ChatContainer = styled.div`
    position: absolute;
    top: 10%;
`;