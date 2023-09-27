import styled from 'styled-components';

export const CapsuleContainer = styled.div`
    padding-top: 4rem;
    justify-content: space-between;
`;

export const CommandContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ButtonContainer = styled.div`
    display: flex;
    margin: .5rem;
    width: 20rem;
    height: 12rem;
    justify-content: center;
    align-items: center;
    border-radius: .5rem;
    background: rgb(255,83,73);
    padding: 1rem;
    text-align: center;
`;

export const FirstColumn = styled.div`
    padding-top: 2rem;
    // width: 25%;
    @media (max-width: 1100px) {
        // position: absolute;
        // width: 40%;
        // left: 0%;
    }
    @media (max-width: 686px) {
        position: static;
        // width: 100%;
        height: 25vh;
    }
`;

export const SecondColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    height: 90vh;
    margin: auto;
    @media (max-width: 686px) {
        margin-top: 2rem;
        position: static;
        width: 100%;
    }
`;

export const FixedBox = styled.div`
    padding: 2rem 1rem 1rem 1rem;
    margin: .2rem .2rem 1rem .2rem; 
    border: solid 1px transparent;
    text-align: center;
    width: 100%;
    height: 5%;
    z-index: 5;
`;

export const OpenedBox = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, .75);
    bottom: 15%;
    right: 15%;
    padding-top: .2rem;
    border-radius: .5rem .5rem .5rem .5rem;
    border: white 1px solid;
    text-align: center;
    width: 20%;
    height: 80%;
    z-index: 5;
`;