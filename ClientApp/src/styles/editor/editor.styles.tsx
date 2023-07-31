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
    right: 16%;
    color: white;
    background: #212529;
    border-radius: .3rem;
    padding: .3rem;
    width: 50%;
    justify-content: space-evenly;
    z-index: 5;
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
        background-color: black;
    }
`;

export const DropDownContainer = styled.div`
    color: white;
    text-align: center;
    margin-bottom: .5rem;
    cursor: pointer;
    &:hover {
        background-color: black;
    }
    &:click {
        opacity:.7;
    }
`;