import { Component } from "react";
import { ListContainer } from "../../styles/messages/messages.styles";
import { Card } from "react-bootstrap";
import { ProjectContainer } from "../../styles/project/project.styles";

class Projects extends Component {
    render() {
        return (
            <ProjectContainer>
                <ListContainer>
                    <Card style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                        New Project +
                    </Card>
                </ListContainer>
            </ProjectContainer>
        );
    }
}

export default Projects;