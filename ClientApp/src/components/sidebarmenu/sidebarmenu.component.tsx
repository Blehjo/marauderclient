import { Component, Dispatch } from "react";
import { Nav, Row } from "react-bootstrap";
import { ChatDots, ChatLeft, Collection, DeviceSsd, Eye, Gear, Globe, LayoutTextWindowReverse, Lightbulb, People, PersonBadge, PersonBoundingBox, Robot, Screwdriver, Star, Tablet } from 'react-bootstrap-icons';
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { SidebarMenuContainer } from "../../styles/sidebarmenu/sidebarmenu.styles";
import { SetIsBuilderOpen, SetIsEditorOpen, setIsBuilderOpen, setIsEditorOpen } from "../../store/messagebox/messagebox.action";

type SidebarMenuProps = ConnectedProps<typeof connector>;

export class SidebarMenu extends Component<SidebarMenuProps> {
    handleBuilderClick(): void {
        this.props.toggleBuilder(false);
        this.props.toggleEditor(false);
    }

    render() {
        const { sidemenu } = this.props;
        const pathname = window.location.pathname;
        return (
            <>
            {
                sidemenu &&
                <SidebarMenuContainer className='fixed-top bg-dark'>
                    <Row 
                        xs={1} 
                    >
                        <Nav.Item style={pathname == "/capcom" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/capcom">
                            <LayoutTextWindowReverse className='icons' color="white" />
                            </a>
                            <Nav.Link href="/capcom" className="tools ms-4">
                                CapCom
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/builder" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/builder">
                            <Screwdriver className='icons' color="white" />
                            </a>
                            <Nav.Link href="/builder" className="tools ms-4">
                                Builder
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/odyssey" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/odyssey">
                            <Globe className='icons' color="white" />
                            </a>
                            <Nav.Link href="/odyssey" className="tools ms-4">
                                Odyssey
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/profile" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/profile">
                            <PersonBoundingBox className='icons' color="white" />
                            </a>
                            <Nav.Link href="/profile" className="tools ms-4">
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/explore" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/explore">
                            <Eye className='icons' color="white" />
                            </a>
                            <Nav.Link href="/explore" className="tools ms-4">
                                Explore
                            </Nav.Link>
                        </Nav.Item>
                        <hr style={{ marginTop: '7%' }}/>
                        <Nav.Item style={pathname == "/crew" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/crew">
                            <Robot className='icons' color="white"  />
                            </a>
                            <Nav.Link href="/crew" className="tools ms-4">
                                Crew
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/messages" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/messages">
                            <ChatDots className='icons' color="white"  />
                            </a>
                            <Nav.Link href="/messages" className="tools ms-4">
                                Messages
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/devices" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/devices">
                            <Tablet className='icons' color="white"  />
                            </a>
                            <Nav.Link href="/devices" className="tools ms-4">
                                Devices
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/projects" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/projects">
                            <Lightbulb className='icons' color="white" />
                            </a>
                            <Nav.Link href="/projects" className="tools ms-4">
                                Projects
                            </Nav.Link>
                        </Nav.Item >
                        <hr style={{ marginTop: '7%' }}/>
                        <Nav.Item style={pathname == "/marauders" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/marauders">
                            <PersonBadge className='icons' color="white" />
                            </a>
                            <Nav.Link href="/marauders" className="tools ms-4">
                                Marauders
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/communities" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/communities">
                            <People className='icons' color="white" />
                            </a>
                            <Nav.Link href="/communities" className="tools ms-4">
                                Communities
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/posts" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/posts">
                            <Collection className='icons' color="white" />
                            </a>
                            <Nav.Link href="/posts" className="tools ms-4">
                                Posts
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/gltfs" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/gltfs">
                            <DeviceSsd className='icons' color="white" />
                            </a>
                            <Nav.Link href="/gltfs" className="tools ms-4">
                                Files
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/chats" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/chats">
                            <ChatLeft className='icons' color="white" />
                            </a>
                            <Nav.Link href="/chats" className="tools ms-4">
                                Chats
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={pathname == "/favorites" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
                            <a href="/favorites">
                            <Star className='icons' color="white" />
                            </a>
                            <Nav.Link href="/favorites" className="tools ms-4">
                                Favorites
                            </Nav.Link>
                        </Nav.Item>
                        <hr style={{ marginTop: '7%' }}/>
                        <Nav.Item style={pathname == "/settings" ? {background: 'rgb(255,83,73)', width: '82%', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center py-1">
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
    sidemenu: state.messagebox.isMaraudersOpen,
    builder: state.messagebox.isBuilderOpen,
    editor: state.messagebox.isEditorOpen
});

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | UserprofileFetchSingleStart | CheckUserSession | SetIsBuilderOpen | SetIsEditorOpen>) => ({
    getCurrentUser: () => dispatch(checkUserSession()),
    getUser: (userId: string | undefined) => dispatch(userprofileFetchSingleStart(userId)),
    checkUserSession: () => dispatch(checkUserSession()),
    toggleBuilder: (boolean: boolean) => dispatch(setIsBuilderOpen(boolean)),
    toggleEditor: (boolean: boolean) => dispatch(setIsEditorOpen(boolean))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SidebarMenu);