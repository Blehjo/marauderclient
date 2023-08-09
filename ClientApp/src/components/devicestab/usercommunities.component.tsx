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
import { Community } from '../../store/community/community.types';

type DevicesTabProps = {
    show: boolean;
    showDelete: boolean;
    communityId: number | null;
}

export class UserCommunitiesTab extends Component<any, DevicesTabProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            communityId: null
        }
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(communityId: number): void {
        this.props.fetchSingleCommunity(communityId);
        // this.props.getComments(communityId);
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount(): void {
        if (this.props.marauderId != undefined) {
            this.props.fetchCommunities(this.props.marauderId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<DevicesTabProps>, snapshot?: any): void {
        if (prevProps.marauderId != this.props.marauderId) {
            this.props.fetchCommunities(this.props.marauderId);
        }
    }

    render() {
        const { communities } = this.props;
        const { show, showDelete } = this.state;
        return (
            <Fragment>
            {
            communities.communities?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {communities.communities?.map(({ communityId, communityName, description, members }: Community) => {
                    return <ChatContainer key={communityId}>
                            <Card style={{ background: 'black', border: '1px solid white', color: 'white' }} key={communityId}>
                            <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(communityId)}/></Badge>
                                </BadgeContainer>
                                {
                                    description && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${description}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    members && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${members.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{communityName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry> : 
                <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white', padding: '.5rem' }}>
                    <Card.Title>"Currently no communities..."</Card.Title>
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
                        <Modal.Title>{communities.singleCommunity?.communityName}</Modal.Title>
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
                    <a href={`/communities/${communities.singleCommunity?.communityId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                        See Community
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        );
    }
}