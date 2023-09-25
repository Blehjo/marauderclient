import styled from 'styled-components';

export const SidebarContainer = styled.div`
    position: sticky;
    z-index: 3;
    @media (max-width: 700px) {
        display: none;
    }
`;

export const ContentContainer = styled.div`
    margin: auto;
    color: white;
    background: black;
    // height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

