import { Component } from "react";
import { ButtonContainer, CapsuleContainer, CommandContainer } from "../../styles/arduino/arduino.styles";

class CapCom extends Component {
    render() {
        return (
            <CapsuleContainer>
                <h1>Capsule Communication</h1>
                <CommandContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                </CommandContainer>
                <CommandContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                    <ButtonContainer>
                        <h1>Hello</h1>
                    </ButtonContainer>
                </CommandContainer>
            </CapsuleContainer>
        )
    }
}

export default CapCom;