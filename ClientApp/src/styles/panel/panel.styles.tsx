import styled from 'styled-components';

export const PanelContainer = styled.div`
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
    @media (max-width: 1100px) {
        position: absolute;
        width: 57.5%;
        left: 42.5%;
    }
    @media (max-width: 686px) {
        margin-top: 2rem;
        position: static;
        width: 100%;
        height: 75vh;
    }
`;