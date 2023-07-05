import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";

import { ButtonContainer, CardContainer, DeviceContainer, FormContainer } from "../../styles/devices/devices.styles";
import { ListContainer } from "../../styles/messages/messages.styles";

import { RootState } from "../../store/store";
import { DeviceCreateStart, DeviceDeleteStart, DeviceFetchAllStart, deviceCreateStart, deviceDeleteStart, deviceFetchAllStart } from "../../store/device/device.action";

interface IDevice {
    deviceName: string;
    show: boolean;
    dropDownValue: string;
}

type DeviceProps = ConnectedProps<typeof connector>;

class Devices extends Component<DeviceProps, IDevice> {
    constructor(props: DeviceProps) {
        super(props);
        this.state = {
            deviceName: "",
            show: false,
            dropDownValue: "Arduino"
        }
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

    handleDelete(deviceId: number): void {

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
    
    componentDidMount(): void {
        this.props.getDevices();
    }

    render() {
        const { deviceName, show, dropDownValue } = this.state;
        const { devices } = this.props;
        return (
            <DeviceContainer>
            <ListContainer>
                <CardContainer onClick={this.handleClick}>
                    New Device +
                </CardContainer>
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
                                    <XCircle onClick={() => this.handleDelete(deviceId)} />
                                </Col>
                            </Row>
                        </Card>
                    ))
                }
            </ListContainer>
            <Modal show={show} onHide={this.handleClick}>
                <Modal.Header closeButton>Add new device?</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormContainer>
                            <Dropdown style={{ marginBottom: '1rem' }}>
                            <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{dropDownValue}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">Arduino Nano</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Esp 32</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Esp 32 Camera</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Raspberry Pi 4</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Raspberry Pi Zero W</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <ButtonContainer className="btn btn-outline-dark" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group controlId="devicename">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={deviceName} name="deviceName" placeholder="Device name" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            </DeviceContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    devices: state.device.devices
});

const mapDispatchToProps = (dispatch: Dispatch<DeviceCreateStart | DeviceDeleteStart | DeviceFetchAllStart>) => ({
    addDevice: (deviceName: string, deviceType: number ) => dispatch(deviceCreateStart(deviceName, deviceType)),
    deleteDevice: (deviceId: number) => dispatch(deviceDeleteStart(deviceId)),
    getDevices: () => dispatch(deviceFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Devices);