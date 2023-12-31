import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { ChevronDown, ChevronUp, Plus, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";

import { ButtonContainer, CardContainer, DeviceContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { ListContainer, MessageForm } from "../../styles/messages/messages.styles";

import { DeviceCreateStart, DeviceDeleteStart, DeviceFetchAllStart, deviceCreateStart, deviceDeleteStart, deviceFetchAllStart } from "../../store/device/device.action";
import { RootState } from "../../store/store";
import { ContainDevices, SelectShape } from "../../styles/editor/editor.styles";

interface IDevice {
    deviceName: string;
    show: boolean;
    showDropdown: boolean;
    dropDownValue: string;
    isConnected: boolean;
    toggleCharacteristic: any;
}

type DeviceProps = ConnectedProps<typeof connector>;

class Devices extends Component<DeviceProps, IDevice> {
    constructor(props: DeviceProps) {
        super(props);
        this.state = {
            deviceName: "",
            show: false,
            showDropdown: false,
            dropDownValue: "Arduino",
            isConnected: false,
            toggleCharacteristic: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openDropwDown = this.openDropwDown.bind(this);
        this.handleSetDevice = this.handleSetDevice.bind(this);
    }
    
    async connect() {
        const navigator: any = window.navigator;
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        // filters: [
        // {
        //     namePrefix: "Hue",
        // },
        // ],
        // Philips Hue Light Control Service
        // optionalServices: ["932c32bd-0000-47a2-835a-a8d455b859dd"],
        });
        const server = await device.gatt?.connect();
            
        // Philips Hue Light Control Service
        const service = await server.getPrimaryService(
            "932c32bd-0000-47a2-835a-a8d455b859dd"
        );
        const toggleChar = await service.getCharacteristic(
            "932c32bd-0002-47a2-835a-a8d455b859dd" // Philips Hue Light On/Off Toggle
        );
      
        this.setState({
            ...this.state, isConnected: !this.state.isConnected, toggleCharacteristic: !this.state.toggleCharacteristic
        })
        // setToggleCharacteristic(toggleChar);
        // setIsConnected(true);
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
    
    componentDidMount(): void {
        this.props.getDevices();
    }

    render() {
        const { deviceName, show, dropDownValue, showDropdown} = this.state;
        const { devices } = this.props;
        return (
            <DeviceContainer>
                <Row xs={1} md={2}>
                    <Col xs={12} md={12} lg={4}>
            <ListContainer>
                <SelectShape style={{ border: '1px solid white', borderRadius: '.5rem', marginBottom: '1rem', textAlign: 'center' }} onClick={this.handleClick}>
                    New Device
                </SelectShape>
                <SelectShape style={{ border: '1px solid white', borderRadius: '.5rem', marginBottom: '1rem', textAlign: 'center' }} onClick={this.connect}>
                    Search Bluetooth
                </SelectShape>
                {
                    devices.map(({ deviceId, deviceName, deviceType }, index) => (
                        <Card onClick={() => this.handleClick()} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }} key={index}>
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
                    ))
                }
            </ListContainer>
            </Col>
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
                            <ButtonContainer className="btn btn-outline-light" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group controlId="devicename">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={deviceName} name="deviceName" placeholder="Device name" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <MessageForm>
                Device Comms

            </MessageForm>
            </Col>
            </Row>
            </DeviceContainer>
        );
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

export default connector(Devices);