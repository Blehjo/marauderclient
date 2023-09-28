import styled from 'styled-components';

export const NavmenuContainer = styled.div`
    // margin-right: -2rem;
    .brand {
        border: 1px solid transparent;
        padding: .2rem;
        @media (max-width: 686px) {
            margin-left: -3rem;
        }
    }
    .brand:hover {
        color: gray;
        background: rgb(255,83,73);
        border-radius: .2rem;
        padding: .2rem;
    }
    // .nav-hidden {
    //     @media (max-width: 992px) {
    //         display: none;
    //     }
    // }
    @media (max-width: 686px) {
        width: 100vw;
    }
`;

export const PersonContainer = styled.div`
    margin-left: 1rem;
    padding: .2rem;
    cursor: pointer;
    :hover {
        color: gray;
        background: rgb(255,83,73);
        border-radius: .2rem;
        padding: .2rem;
    }
`;