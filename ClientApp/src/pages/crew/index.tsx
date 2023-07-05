import { Component } from "react";
import { ListContainer } from "../../styles/messages/messages.styles";
import { Card } from "react-bootstrap";
import { CrewContainer } from "../../styles/crew/crew.styles";

class Crew extends Component {
    render() {
        return (
            <CrewContainer>
            <ListContainer>
                <Card style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                    New Crew +
                </Card>
            </ListContainer>
            </CrewContainer>
        );
    }
}

export default Crew;