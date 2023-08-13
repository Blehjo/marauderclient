import styled from 'styled-components';

export const ExplorePanel = styled.div`
  margin: 1rem 0rem 1rem 0rem;
`;

export const ExploreContainer = styled.div`
    margin-top: 5rem;
`;

export const ImageContainer = styled.div`
object-fit: cover;
  position: relative;
  border-radius: 5rem;
  width: 100%;
  height: auto;
`;

export const ImageOverlayContainer = styled.div`
  position: absolute; 
  left: 50%; 
  top: 50%; 
  border-radius: 1rem; 
  transform: translate(-50%, -50%); 
`;

export const ExploreFontContainer = styled.div`
  font-size: 500%;
  color: white;
  background: black;
  padding: 1rem;
  opacity: 0.7;
  border-radius: .5rem;
`;