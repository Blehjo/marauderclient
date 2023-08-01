import { Component } from "react";
import { CardContainer, InfoContainer, OptionsContainer, VitalsContainer } from "../../styles/vitals/vitals.styles";

class Vitals extends Component {
    render() {
        return (
            <VitalsContainer>
                <InfoContainer>Get Started</InfoContainer>
                <p>Create a new file and start building your imagination!</p>
                <OptionsContainer>
                <CardContainer style={{ cursor: 'pointer' }}>New File</CardContainer>
                <CardContainer>Create Team</CardContainer>
                <CardContainer>View Community</CardContainer>
                </OptionsContainer>
            </VitalsContainer>
        );
    }
}

export default Vitals;