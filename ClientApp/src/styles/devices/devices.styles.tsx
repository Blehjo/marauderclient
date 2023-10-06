import { styled } from "styled-components";

export const DeviceContainer = styled.div`
    padding-top: 5rem;
    // display: flex;
    // flex-direction: row;
    // justify-content: center;
    // align-items: center;
    position: relative;
`;

export const FormContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    // margin-bottom: 3rem;
`;

export const ButtonContainer = styled.button`
    border: solid 1px black;
    position: absolute;
    top: -4rem;
    left: 90%;
`;

export const XContainer = styled.div`
    &:hover {
        color: gray;
    }
`;

export const CardContainer = styled.div`
    border-radius: .3rem; 
    border: solid 1px white; 
    margin: .2rem .2rem 1rem .2rem; 
    padding: .1rem;
    cursor: pointer; 
    color: white; 
    text-align: center;
`;

export const ListContainer = styled.div`
    height: 85vh;
    // width: 100%;
    overflow-y: auto;
    padding: 1rem;
    border: solid 1px white;
    border-radius: 1rem;
    background: black;
    @media (max-width: 1100px) {
        height: 30rem;
    }
    @media (max-width: 686px) {
        height: calc(100% - 1em);
    }
`;