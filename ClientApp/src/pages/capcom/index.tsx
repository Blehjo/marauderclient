import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { io } from 'socket.io-client';
import { ButtonContainer, CapsuleContainer, CommandContainer, FirstColumn, FixedBox, OpenedBox, SecondColumn } from "../../styles/arduino/arduino.styles";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { DeviceCreateStart, DeviceDeleteStart, DeviceFetchAllStart, deviceCreateStart, deviceDeleteStart, deviceFetchAllStart } from "../../store/device/device.action";
import { CardContainer, XContainer, ButtonContainer as DeleteContainer, ListContainer } from "../../styles/devices/devices.styles";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowsExpand, ChevronDown, ChevronUp, Plus, Search, ThreeDotsVertical, XCircle } from "react-bootstrap-icons";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { SetIsDevicesOpen, setIsDevicesOpen } from "../../store/messagebox/messagebox.action";
import { ContainerBox } from "../../styles/messagebox/messagebox.styles";
import { ContainDevices, ContainShapes, SelectShape } from "../../styles/editor/editor.styles";
import { ButtonContainer as SubmitContainer, FormContainer } from "../../styles/devices/devices.styles";

interface ICapCom {
    light: boolean,
    deviceName: string;
    show: boolean;
    showDropdown: boolean;
    dropDownValue: string;
    isConnected: boolean;
    toggleCharacteristic: any;
    result: boolean;
}

type CapComProps = ConnectedProps<typeof connector>;

class CapCom extends Component<CapComProps, ICapCom> {
    constructor(props: any) {
        super(props);
        this.state = {
            light: false,
            deviceName: "",
            show: false,
            showDropdown: false,
            dropDownValue: "Arduino",
            isConnected: false,
            toggleCharacteristic: null,
            result: this.props.isDevicesOpen
        }
        this.turnOffLight = this.turnOffLight.bind(this);
        this.turnOnLight = this.turnOnLight.bind(this);
        this.togglePin = this.togglePin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenDevices = this.handleOpenDevices.bind(this);
        this.openDropwDown = this.openDropwDown.bind(this);
        this.handleSetDevice = this.handleSetDevice.bind(this);
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

    handleOpenDevices(): void {
        const { result } = this.state;
        this.setState({
            ...this.state, result: !result
        });
        this.props.openDevices(!result);
    }

    handleSetDevice(device: string): void {
        this.setState({
            ...this.state, dropDownValue: device
        })
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

    openDropwDown() {
        this.setState({
            showDropdown: !this.state.showDropdown
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
        const socket = io('http://localhost:8000');
        socket.emit('lightsoff', light);
    }
    
    turnOnLight() {
        const { light } = this.state;
        const socket = io('http://localhost:8000');
        socket.emit('lightson', light);
    }
    render() {
        const { deviceName, show, dropDownValue, showDropdown } = this.state;
        const { devices, isDevicesOpen } = this.props; 
        return (
            <CapsuleContainer>
                <Row xs={1} md={2}>
                    <Col xs={12} md={12} lg={4}>
                {
                    isDevicesOpen ?  
                <FirstColumn>
                <ListContainer>
                <CardContainer>
                    <ContainerBox style={{ marginLeft: '.5rem'}}>
                    Devices
                    </ContainerBox>
                    <ContainerBox>
                        <div style={{ position: 'absolute', right: '0rem' }}>
                            <AContainer><Plus size={40} style={{ padding: '1rem 0rem 0rem 0rem', cursor: 'pointer' }} onClick={this.handleClick}/></AContainer>
                            <AContainer><Search size={30} style={{ padding: '1rem .4rem 0rem .4rem', cursor: 'pointer' }}/></AContainer>
                            <AContainer><ChevronUp size={40} onClick={this.handleOpenDevices} style={{ cursor: 'pointer', padding: '1rem .4rem 0rem 0rem' }}/></AContainer>
                        </div>
                    </ContainerBox>
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
                </FirstColumn> :
                 <FixedBox>
                    <div style={{  borderRadius: '.5rem', border: 'white solid 1px', background: 'rgba(0, 0, 0, .75)'}} >
                    <ContainerBox>
                        <Row xs={2}>
                        <Col>
                            <div style={{ paddingLeft: '1rem' }}>Devices</div>
                        </Col>
                        </Row>
                    </ContainerBox> 
                    <ContainerBox>
                        <div style={{ position: 'absolute', right: '0rem' }}>
                            <AContainer><Plus size={40} style={{ padding: '1rem 0rem 0rem 0rem', cursor: 'pointer' }} onClick={this.handleClick}/></AContainer>
                            <AContainer><Search size={30} style={{ padding: '1rem .4rem 0rem .4rem', cursor: 'pointer' }}/></AContainer>
                            <AContainer><ChevronDown size={40} onClick={this.handleOpenDevices} style={{ cursor: 'pointer', padding: '1rem .4rem 0rem 0rem' }}/></AContainer>
                        </div>
                    </ContainerBox>
                    </div>
                 </FixedBox> 
                }
                </Col>
                <Col xs={12} md={12} lg={8}>
                <SecondColumn>
                <CommandContainer>
                    <ButtonContainer>
                        Room
                    </ButtonContainer>
                    <ButtonContainer>
                        Bathroom
                    </ButtonContainer>
                    <ButtonContainer>
                        Bathroom
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
                </Col>
                </Row>
                <Row>
                <Col xs={12}>
                <Modal className="deviceModal" show={show} onHide={this.handleClick}>
                    <Modal.Header closeButton>Add new device?</Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <ContainDevices onClick={this.openDropwDown} key="dropdown" >
                                <SelectShape>
                                    {dropDownValue} {showDropdown ? <ChevronUp/> : <ChevronDown/>}
                                </SelectShape>
                                {
                                showDropdown && <>
                                <SelectShape onClick={() => this.handleSetDevice("Arduino")} key="6">Arduino</SelectShape>
                                <SelectShape onClick={() => this.handleSetDevice("Arduino Nano")} key="1">Arduino Nano</SelectShape>
                                <SelectShape onClick={() => this.handleSetDevice("Esp 32")} key="2">Esp 32</SelectShape>
                                <SelectShape onClick={() => this.handleSetDevice("Esp 32 Camera")} key="3">Esp 32 Camera</SelectShape>
                                <SelectShape onClick={() => this.handleSetDevice("Raspberry Pi 4")} key="4">Raspberry Pi 4</SelectShape>
                                <SelectShape onClick={() => this.handleSetDevice("Raspberry Pi Zero W")} key="5">Raspberry Pi Zero W</SelectShape>
                                </>
                                }
                            </ContainDevices>
                            <FormContainer>
                                <SubmitContainer className="btn btn-outline-light" type="submit">
                                    <Plus style={{ cursor: 'pointer' }} size={15}/>
                                </SubmitContainer>
                            </FormContainer>
                            <Form.Group controlId="devicename">
                                <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={deviceName} name="deviceName" placeholder="Device name" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
                </Col>
                </Row>
            </CapsuleContainer>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    devices: state.device.devices,
    isDevicesOpen: state.messagebox.isDevicesOpen
});

const mapDispatchToProps = (dispatch: Dispatch<DeviceCreateStart | DeviceDeleteStart | DeviceFetchAllStart | SetIsDevicesOpen>) => ({
    addDevice: (deviceName: string, deviceType: number ) => dispatch(deviceCreateStart(deviceName, deviceType)),
    deleteDevice: (deviceId: string) => dispatch(deviceDeleteStart(deviceId)),
    getDevices: () => dispatch(deviceFetchAllStart()),
    openDevices: (boolean: boolean) => dispatch(setIsDevicesOpen(boolean))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CapCom);