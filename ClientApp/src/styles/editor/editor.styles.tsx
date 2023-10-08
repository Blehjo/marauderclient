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
    left: 50%;
    transform: translate(-50%, 0);
    top: 8%;
    // right: 16%;
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
    justify-content: center;
    width: 2rem;
    text-align: center;
    cursor: pointer;
    z-index: 100;
    &:hover {
        background-color: rgb(255,83,73);
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

export const Dot = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate3d(-50%, -50%, 0);
    border: 2px solid white;
`;

export const ContainShapes = styled.div`
    padding: 1rem;
    position: fixed;
    width: 20%;
    height: auto;
    top: 125%;
    left: 55%;
    background-color: #212529;
    border-radius: .2rem;
    border: solid 1px white;
    text-align: center;
`;

export const ContainDevices = styled.div`
    padding: .5rem;
    width: 50%;
    margin-bottom: 1rem;
    height: 100%;
    background-color: #212529;
    color: white;
    border-radius: .5rem;
    border: solid 1px white;
    text-align: center;
`;

export const SelectShape = styled.div`
    cursor: pointer;
    color: white;
    z-index: 10;
    padding: .2rem;
    &:hover {
        background: rgb(255,83,73);
        border-radius: .2rem;
        // border: solid 1px white;
    }
`;