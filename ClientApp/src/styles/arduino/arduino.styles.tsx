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

export const FixedBox = styled.div`
    // position: fixed;
    // top: 15%;
    // left: 15%;
    padding-top: 2rem;
    text-align: center;
    width: 25%;
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