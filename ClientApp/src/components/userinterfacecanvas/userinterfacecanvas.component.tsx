import { Component, ReactNode } from "react";
import { CloseButton, Col, Image, Modal, Nav, Offcanvas, Row } from "react-bootstrap";
import { UserInterfaceCanvasContainer } from "../../styles/userinterfacecanvas/userinterfacecanvas.styles";
import { ChatDots, ChatLeft, Collection, Controller, DeviceHdd, DeviceSsd, DoorClosed, DoorOpen, Eye, Gear, LayoutTextWindowReverse, Lightbulb, PersonBadge, Robot, Screwdriver, Star } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import Authentication from "../../pages/authentication";

interface IUserCanvas {
    authentication: boolean;
}

class UserInterfaceCanvas extends Component<any, IUserCanvas> {
    constructor(props: any) {
        super(props);
        this.state = {
            authentication: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(): void {
        this.setState({
            ...this.state, authentication: !this.state.authentication
        })
    }

    goToAuth(): ReactNode {
        const { authentication } = this.state;
        return (
            <Modal show={authentication} onHide={this.handleClick}>
                <Modal.Header closeButton/>
                <Authentication/>
            </Modal>
        )
    }

    render() {
        const { show, handleClick, user, signOut } = this.props;
        return (
            <UserInterfaceCanvasContainer>
                <Offcanvas style={{ background: 'black', width: '25%', borderRadius: '.5rem 0rem 0rem .5rem', color: 'white' }} scroll backdrop={false} placement="end" show={show} onHide={handleClick}>
                    <Offcanvas.Header >
                        <Offcanvas.Title style={{ lineHeight: '1.5rem'}}>
                            <Row xs={2}>
                            <Col xs={3}>
                            <Image style={{ width: '3rem', height: '3rem' }}fluid src={user?.imageLink ? user?.imageSource : ""}/>
                            </Col>
                            <Col>
                            <Row xs={1}>
                            <Col>
                            {user?.username}
                            </Col>
                            <Col>
                            {user?.about}
                            </Col>
                            </Row>
                            </Col>
                            </Row>
                        </Offcanvas.Title>
                        <CloseButton className="bg-light" onClick={handleClick}></CloseButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/voyager">
                        <LayoutTextWindowReverse className='icons' color="white" />
                        </a>
                        <Nav.Link href="/comms" className="tools ms-4">
                            Comms
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/builder">
                        <Screwdriver className='icons' color="white" />
                        </a>
                        <Nav.Link href="/builder" className="tools ms-4">
                            Builder
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/vitals">
                        <Controller className='icons' color="white" />
                        </a>
                        <Nav.Link href="/vitals" className="tools ms-4">
                            Vitals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/profile">
                        <DeviceHdd className='icons' color="white" />
                        </a>
                        <Nav.Link href="/profile" className="tools ms-4">
                            Profile
                        </Nav.Link>
                    </Nav.Item>
                    <hr style={{ color: 'white' }}/>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/crew">
                        <Robot className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/crew" className="tools ms-4">
                            Crew
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/messages">
                        <ChatDots className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/messages" className="tools ms-4">
                            Messages
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/explore">
                        <Eye className='icons' color="white" />
                        </a>
                        <Nav.Link href="/explore" className="tools ms-4">
                            Explore
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/devices">
                        <DeviceSsd className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/devices" className="tools ms-4">
                            Devices
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/projects">
                        <Lightbulb className='icons' color="white" />
                        </a>
                        <Nav.Link href="/projects" className="tools ms-4">
                            Projects
                        </Nav.Link>
                    </Nav.Item >
                    <hr style={{ color: 'white' }}/>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/marauders">
                        <PersonBadge className='icons' color="white" />
                        </a>
                        <Nav.Link href="/marauders" className="tools ms-4">
                            Marauders
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/posts">
                        <Collection className='icons' color="white" />
                        </a>
                        <Nav.Link href="/posts" className="tools ms-4">
                            Posts
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/chats">
                        <ChatLeft className='icons' color="white" />
                        </a>
                        <Nav.Link href="/chats" className="tools ms-4">
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/favorites">
                        <Star className='icons' color="white" />
                        </a>
                        <Nav.Link href="/favorites" className="tools ms-4">
                            Favorites
                        </Nav.Link>
                    </Nav.Item>
                    <hr style={{ color: 'white' }} />
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/settings">
                        <Gear className='icons' color="white" />
                        </a>
                        <Nav.Link href="/settings" className="tools ms-4">
                            Settings
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        {
                            user ?
                            <>
                                <DoorClosed onClick={signOut} className='icons' color="white" />
                                <Nav.Link onClick={signOut} className="tools ms-4">
                                    Sign Out
                                </Nav.Link>
                            </> :
                            <>
                                <DoorOpen onClick={this.handleClick} className='icons' color="white" />
                                <Nav.Link onClick={this.handleClick} className="tools ms-4">
                                    Sign In
                                </Nav.Link>
                            </>
                        }
                    </Nav.Item>
                    </Offcanvas.Body>
                </Offcanvas>
                {this.goToAuth()}
            </UserInterfaceCanvasContainer>
        );
    }
}

export default UserInterfaceCanvas;