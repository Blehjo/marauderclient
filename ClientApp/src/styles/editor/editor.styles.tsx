import { styled } from "styled-components";

export const EditorContainer = styled.div`
    height: 80vh;
    width: 80vw;
    padding-top: 5rem;
`;

export const UiContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 8%;
    right: 20%;
    color: white;
    background: darkblue;
    border-radius: .3rem;
    padding: .3rem;
    width: 50%;
    justify-content: space-evenly;
`;

export const DivContainer = styled.div`
    border: 1px solid white;
    border-radius: .3rem;
    padding: .1rem;
    width: 2rem;
    text-align: center;
    cursor: pointer;
    z-index: 100;
    &:hover {
        background-color: yellow;
    }
`;