import { styled } from "styled-components";

export const DeviceContainer = styled.div`
    padding-top: 5rem;
    position: relative;
`;

export const FormContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin-bottom: 3rem;
`;

export const ButtonContainer = styled.button`
    border: solid 1px black;
    position: absolute;
    left: 90%;
`;

export const CardContainer = styled.div`
    border-radius: .3rem; 
    border: solid 1px white; 
    margin: .2rem .2rem 1rem .2rem; 
    padding: .1rem;
    cursor: pointer; 
    color: white; 
    text-align: center;
    &:hover {
        color: gray;
    }
`;