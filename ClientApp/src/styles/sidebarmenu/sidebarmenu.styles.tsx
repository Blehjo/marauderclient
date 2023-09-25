import styled from 'styled-components';

export const SidebarMenuContainer = styled.div`
    display: flex;
    font-size: 15px;
    width: 16rem;
    color: white; 
    height: 100%;
    overflow-y: auto;
    padding-top: 5rem; 
    overflow-x: hidden;
    border: 3px solid white;
    border-radius: 5px;
    padding-bottom: 8rem;
    .d-flex:hover {
        color: gray;
        background: rgb(255,83,73);
        border-radius: .2rem;
        width: 82%;
    }
    .icons:hover {
        color: gray;
    }
    @media (max-width: 700px) {
        display: none;
    }
`;