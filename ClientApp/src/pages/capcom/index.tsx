import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { io } from 'socket.io-client';
import { ButtonContainer, CapsuleContainer, CommandContainer, FirstColumn, SecondColumn } from "../../styles/arduino/arduino.styles";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { DeviceCreateStart, DeviceDeleteStart, DeviceFetchAllStart, deviceCreateStart, deviceDeleteStart, deviceFetchAllStart } from "../../store/device/device.action";
import { CardContainer, XContainer, ButtonContainer as DeleteContainer, ListContainer } from "../../styles/devices/devices.styles";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";
import { FormContainer } from "../../styles/poststab/poststab.styles";

interface ICapCom {
    light: boolean,
    deviceName: string;
    show: boolean;
    dropDownValue: string;
    isConnected: boolean;
    toggleCharacteristic: any;
}

type CapComProps = ConnectedProps<typeof connector>;

class CapCom extends Component<CapComProps, ICapCom> {
    constructor(props: any) {
        super(props);
        this.state = {
            light: false,
            deviceName: "",
            show: false,
            dropDownValue: "Arduino",
            isConnected: false,
            toggleCharacteristic: null
        }
        this.turnOffLight = this.turnOffLight.bind(this);
        this.turnOnLight = this.turnOnLight.bind(this);
        this.togglePin = this.togglePin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleDelete(deviceId: string): void {
        this.props.deleteDevice(deviceId);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { deviceName, dropDownValue } = this.state;
        const deviceType = dropDownValue.toLowerCase();
        switch (deviceType) {
            case "arduino":
                this.props.addDevice(deviceName, 0);
                break;
            case "arduino nano":
                this.props.addDevice(deviceName, 1);
                break;
            case "esp 32":
                this.props.addDevice(deviceName, 2);
                break;
            case "esp 32 camera":
                this.props.addDevice(deviceName, 3);
                break;
            case "raspberry pi 4":
                this.props.addDevice(deviceName, 4);
                break;
            case "raspberry pi zero w":
                this.props.addDevice(deviceName, 5);
                break;
            default:
                return this.props.addDevice(deviceName, 0);
        }
        this.setState({
            show: !this.state.show
        });
    }

    togglePin() {
        const { light } = this.state;
        const socket = io('http://localhost:8000');
        if (!light) {
            socket.emit('lightson', light);
            this.setState({ light: !light})
        } else {
            socket.emit('lightsoff', light);
            this.setState({ light: !light})
        }
    }

    turnOffLight() {
        const { light } = this.state;
        const socket = io('https://localhost:8000');
        socket.emit('lightsoff', light);
    }
    
    turnOnLight() {
        const { light } = this.state;
        const socket = io('https://localhost:8000');
        socket.emit('lightson', light);
    }
    render() {
        const { deviceName, show, dropDownValue } = this.state;
        const { devices } = this.props; 
        return (
            <CapsuleContainer>
                <FirstColumn>
                <ListContainer>
                <CardContainer onClick={this.handleClick}>
                    New Device +
                </CardContainer>
                {
                    devices.map(({ deviceId, deviceName, deviceType }, index) => (
                        <Card onClick={() => this.handleClick()} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'rgb(255,83,73)', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }} key={index}>
                            <Row key={index} xs={3}>
                                <Col xs={4}>
                                    <Image style={{ borderRadius: '.4rem', margin: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={"avatarUrl"} />
                                </Col>
                                <Col xs={5}>
                                    <div style={{ alignItems: 'center' }}>
                                        <div>
                                            {deviceName}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={1}>
                                    <XContainer>
                                    <XCircle onClick={() => this.handleDelete(deviceId)} />
                                    </XContainer>
                                </Col>
                            </Row>
                        </Card>
                ))}
                </ListContainer>
                </FirstColumn>
                <SecondColumn>
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
                </SecondColumn>
                <Modal show={show} onHide={this.handleClick}>
                    <Modal.Header closeButton>Add new device?</Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <FormContainer>
                                <Dropdown style={{ marginBottom: '1rem' }}>
                                <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{dropDownValue}</Dropdown.Toggle>
                                    {/* <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1">Arduino Nano</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Esp 32</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">Esp 32 Camera</Dropdown.Item>
                                        <Dropdown.Item eventKey="4">Raspberry Pi 4</Dropdown.Item>
                                        <Dropdown.Item eventKey="4">Raspberry Pi Zero W</Dropdown.Item>
                                    </Dropdown.Menu> */}
                                </Dropdown>
                                <DeleteContainer className="btn btn-outline-dark" type="submit">
                                    <Plus style={{ cursor: 'pointer' }} size={15}/>
                                </DeleteContainer>
                            </FormContainer>
                            <Form.Group controlId="devicename">
                                <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={deviceName} name="deviceName" placeholder="Device name" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </CapsuleContainer>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    devices: state.device.devices
});

const mapDispatchToProps = (dispatch: Dispatch<DeviceCreateStart | DeviceDeleteStart | DeviceFetchAllStart>) => ({
    addDevice: (deviceName: string, deviceType: number ) => dispatch(deviceCreateStart(deviceName, deviceType)),
    deleteDevice: (deviceId: string) => dispatch(deviceDeleteStart(deviceId)),
    getDevices: () => dispatch(deviceFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CapCom);