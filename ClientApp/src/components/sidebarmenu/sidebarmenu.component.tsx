import { Component, Dispatch } from "react";
import { Nav, Row } from "react-bootstrap";
import { ChatDots, ChatLeft, Collection, DeviceSsd, Eye, Gear, Globe, LayoutTextWindowReverse, Lightbulb, People, PersonBadge, PersonBoundingBox, Robot, Screwdriver, Star, Tablet } from 'react-bootstrap-icons';
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { SidebarMenuContainer } from "../../styles/sidebarmenu/sidebarmenu.styles";

type SidebarMenuProps = ConnectedProps<typeof connector>;

export class SidebarMenu extends Component<SidebarMenuProps> {
    handleClick(): void {
        if (this.props != undefined) {
            this.props.checkUserSession();
            this.props.getUser(this.props.user);
        }
    }

    render() {
        const { sidemenu } = this.props;
        return (
            <>
            {
                sidemenu &&
                <SidebarMenuContainer className='mt-5 fixed-top bg-dark'>
                    <Row 
                    xs={1} 
                    >
                        <Nav.Item className="ms-4 d-flex align-items-center">
                            <a href="/voyager">
                            <LayoutTextWindowReverse className='icons' color="white" />
                            </a>
                            <Nav.Link href="/capcom" className="tools ms-4">
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
                            <a href="/builder">
                            <Globe className='icons' color="white" />
                            </a>
                            <Nav.Link href="/odyssey" className="tools ms-4">
                                Odyssey
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="ms-4 d-flex align-items-center">
                            <a onClick={this.handleClick} href="/profile">
                            <PersonBoundingBox className='icons' color="white" />
                            </a>
                            <Nav.Link onClick={this.handleClick} href="/profile" className="tools ms-4">
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
                        <hr style={{ marginTop: '7%' }}/>
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
                            <Tablet className='icons' color="white"  />
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
                        <hr style={{ marginTop: '7%' }}/>
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
                        <hr style={{ marginTop: '7%' }}/>
                        <Nav.Item className="ms-4 d-flex align-items-center">
                            <a href="/settings">
                            <Gear className='icons' color="white" />
                            </a>
                            <Nav.Link href="/settings" className="tools ms-4">
                                Settings
                            </Nav.Link>
                        </Nav.Item>
                    </Row>
                </SidebarMenuContainer>
            }
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user.currentUser?.userId,
    userprofile: state.userprofile,
    sidemenu: state.messagebox.isMaraudersOpen
});

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | UserprofileFetchSingleStart | CheckUserSession>) => ({
    getCurrentUser: () => dispatch(checkUserSession()),
    getUser: (userId: number | undefined) => dispatch(userprofileFetchSingleStart(userId)),
    checkUserSession: () => dispatch(checkUserSession())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SidebarMenu);