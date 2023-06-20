import { Component } from "react";
import { io } from 'socket.io-client';
import { ButtonContainer, CapsuleContainer, CommandContainer } from "../../styles/arduino/arduino.styles";

interface ICapCom {
    light: boolean
}

class CapCom extends Component<any, ICapCom> {
    constructor(props: any) {
        super(props);
        this.state = {
            light: false
        }
        this.turnOffLight = this.turnOffLight.bind(this);
        this.turnOnLight = this.turnOnLight.bind(this);
        this.togglePin = this.togglePin.bind(this);
    }

    togglePin() {
        const { light } = this.state;
        const socket = io('http://192.168.0.242:3000');
        if (!light) {
            socket.emit('lightson', light);
            this.setState({ light: !light})
            console.log("LIGHT: ", light)
        } else {
            socket.emit('lightsoff', light);
            this.setState({ light: !light})
        }
    }

    turnOffLight() {
        const { light } = this.state;
        const socket = io('http://192.168.0.242:3000');
        socket.emit('lightsoff', light);
    }
    
    turnOnLight() {
        const { light } = this.state;
        const socket = io('http://192.168.0.242:3000');
        socket.emit('lightson', light);
    }
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
                        <button onClick={this.togglePin}>Switch</button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button onClick={this.turnOnLight}>Turn on light</button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button onClick={this.turnOffLight}>Turn off light</button>
                    </ButtonContainer>
                </CommandContainer>
            </CapsuleContainer>
        )
    }
}

export default CapCom;