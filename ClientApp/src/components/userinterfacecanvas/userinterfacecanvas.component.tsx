import { Component, ReactNode } from "react";
import { CloseButton, Col, Image, Modal, Nav, Offcanvas, Row } from "react-bootstrap";
import { ChatDots, ChatLeft, Collection, DeviceHdd, DeviceSsd, DoorClosed, DoorOpen, Eye, Gear, Globe, LayoutTextWindowReverse, Lightbulb, People, PersonBadge, Robot, Screwdriver, Star } from "react-bootstrap-icons";
import Authentication from "../../pages/authentication";
import { UserInterfaceCanvasContainer } from "../../styles/userinterfacecanvas/userinterfacecanvas.styles";

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
                <div style={{ background: 'black', paddingBottom: '5rem', borderRadius: '.3rem' }}>
                {<Authentication/>}
                </div>
            </Modal>
        )
    }

    componentDidMount(): void {
        if (this.props.user?.currentUser != null) {
            console.log("CHECK::")
            this.props.check();
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IUserCanvas>, snapshot?: any): void {
        if (prevProps.user?.currentUser != this.props.user?.currentUser) {
            console.log("DIFFERENT::")
            this.setState({
                ...this.state, authentication: false
            })
        }
    }

    render() {
        const { show, handleClick, user, signOut } = this.props;
        return (
            <UserInterfaceCanvasContainer>
                <Offcanvas style={{ background: 'black', opacity: '75%', width: '25%', borderRadius: '.5rem 0rem 0rem .5rem', borderTop: '1px solid white', borderLeft: '1px solid white', borderBottom: '1px solid white', color: 'white' }} scroll backdrop={false} placement="end" show={show} onHide={handleClick}>
                    <Offcanvas.Header >
                    {user && <Offcanvas.Title style={{ lineHeight: '1.5rem', marginTop: '1rem' }}>
                            <Row xs={2}>
                            <Col xs={3}>
                            <Image style={{ marginLeft: '1.5rem', marginRight: '3rem', width: '3rem', height: '3rem' }} fluid src={user?.imageLink ? user?.imageSource : ""}/>
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
                        </Offcanvas.Title>}
                        <CloseButton className="bg-light" onClick={handleClick}></CloseButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/voyager">
                        <LayoutTextWindowReverse className='icons' color="white" />
                        </a>
                        <Nav.Link href="/comms" className="tools ms-4">
                            CapCom
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
                        <Globe className='icons' color="white" />
                        </a>
                        <Nav.Link href="/odyssey" className="tools ms-4">
                            Odyssey
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
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <a href="/explore">
                        <Eye className='icons' color="white" />
                        </a>
                        <Nav.Link href="/explore" className="tools ms-4">
                            Explore
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
                            <a href="/communities">
                            <People className='icons' color="white" />
                            </a>
                            <Nav.Link href="/communities" className="tools ms-4">
                                Communities
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
                            <a href="/posts">
                            <DeviceSsd className='icons' color="white" />
                            </a>
                            <Nav.Link href="/gltfs" className="tools ms-4">
                                Files
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
                    <hr style={{ color: 'white' }} />
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