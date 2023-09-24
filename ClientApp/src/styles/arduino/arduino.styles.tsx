import styled from 'styled-components';

export const CapsuleContainer = styled.div`
    padding-top: 4rem;
    display: flex;
    flex-direction: row;
    // align-items: center;
    justify-content: space-between;
`;

export const CommandContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ButtonContainer = styled.div`
    margin: .5rem;
    border-radius: .5rem;
    background: rgb(255,83,73);
    padding: 1rem;
`;

export const FirstColumn = styled.div`
    padding-top: 2rem;
    width: 25%;
`;

export const SecondColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    height: 90vh;
    margin: auto;
`;