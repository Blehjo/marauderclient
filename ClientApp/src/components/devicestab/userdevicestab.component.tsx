import { Component, Fragment } from 'react';
import { Badge, Card, Col, Image, Modal, Row } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArrowsFullscreen, Globe, Rocket, XCircle } from 'react-bootstrap-icons';

import { BadgeContainer, ChatContainer, ModalContainer } from "../../styles/poststab/poststab.styles";
import { ProfileProps } from '../../pages/profile';
import { DeviceState } from '../../store/device/device.reducer';
import { XContainer } from '../../styles/devices/devices.styles';
import { SingleProfileProps } from '../../pages/profile/[id]';
import { Device } from '../../store/device/device.types';

type DevicesTabProps = {
    show: boolean;
    showDelete: boolean;
    deviceId: number | null;
}

export class UserDevicesTab extends Component<any, DevicesTabProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            deviceId: null
        }
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(deviceId: number): void {
        this.props.fetchSingleDevice(deviceId);
        // this.props.getComments(deviceId);
        this.setState({
            show: !this.state.show
        });
    }
    
    handleCloseDelete(): void {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    handleDeleteClick(deviceId: number): void {
        this.setState({
            deviceId: deviceId
        })
        this.handleCloseDelete();
    }

    componentDidMount(): void {
        this.props.fetchDevices();
    }

    componentDidUpdate(prevProps: Readonly<{ devices: DeviceState} & { getChats: () => void; }>, prevState: Readonly<DevicesTabProps>, snapshot?: any): void {
        if (this.props.devices.userDevices?.length !== prevProps.devices.userDevices?.length) {
            this.props.fetchDevices();
        }
    }

    render() {
        const { devices } = this.props;
        const { show, showDelete } = this.state;
        return (
            <Fragment>
            {
            devices.userDevices?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {devices.userDevices?.map(({ deviceId, deviceName, deviceType, pins }: Device) => {
                    return <ChatContainer key={deviceId}>
                            <Card style={{ background: 'black', border: '1px solid white', color: 'white' }} key={deviceId}>
                            <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(deviceId)}/></Badge>
                                </BadgeContainer>
                                {
                                    deviceType && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${deviceType}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    pins && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${pins.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
                                <Col xs={3}>
                                    <XContainer>
                                    <XCircle onClick={() => this.handleDeleteClick(deviceId)} key={deviceId} style={{ background: "white", borderRadius: ".5rem", color: "black", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                                    </XContainer>
                                </Col>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{deviceName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry> : 
                <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white', padding: '.5rem' }}>
                    <Card.Title>"Currently no devices..."</Card.Title>
                </Card>
                </Col>
                }
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title>{devices.singleDevice?.deviceName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                            />
                            </Col>
                            <Col>
                            <div>Notes</div>
                            {/* {
                                chatComments.chatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
                                    return <CardContainer>
                                        <Card className="bg-dark" key={chatCommentId}>
                                            <TextContainer>
                                                <Card.Text>{chatValue}</Card.Text>
                                                <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    </CardContainer>
                                })
                            } */}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <a href={`/singledevice/${devices.singleDevice?.deviceId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                        Single View
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        );
    }
}