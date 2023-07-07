import { Component, Dispatch } from 'react';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { List, PersonCircle } from 'react-bootstrap-icons';

import { NavmenuContainer, PersonContainer } from '../../styles/navmenu/navmenu.styles';
import UserInterfaceCanvas from '../userinterfacecanvas/userinterfacecanvas.component';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/store';
import { CheckUserSession, SignOutStart, checkUserSession, signOutStart } from '../../store/user/user.action';

interface INavMenu {
    show: boolean;
}

type NavMenuProps = ConnectedProps<typeof connector>;

class NavMenu extends Component<NavMenuProps, INavMenu> {
    constructor(props: NavMenuProps) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount(): void {
        this.props.checkUserSession();
    }

    render() {
        const { show } = this.state;
        const { user } = this.props;
        return (
            <NavmenuContainer className="fixed-top">
                <Navbar style={{ border: "1px solid orangered" }} variant="dark" bg="dark" sticky="top" expand="lg" >
                    <Container fluid>
                    <List style={{ marginLeft: '.75rem', border: '1px solid white', marginRight: '1rem', padding: '.02rem', borderRadius: '.2rem' }} className="d-flex align-items-center"/>
                    <Navbar.Brand href="/">Marauders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        <Nav.Link href="/dash">Dashboard</Nav.Link>
                        <Nav.Link href="/capcom">CapCom</Nav.Link>
                        <NavDropdown title="Comms" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/devices">Devices</NavDropdown.Item>
                            <NavDropdown.Item href="/chats">Chats</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <button type="button" className="btn btn-outline-light">Search</button>
                        </Form>
                        <PersonContainer>
                            <PersonCircle onClick={this.handleClick} size={30}/>
                            <UserInterfaceCanvas user={this.props.user}  handleClick={this.handleClick} show={show}/>
                        </PersonContainer>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </NavmenuContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        user: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | SignOutStart>) => ({
    checkUserSession: () => dispatch(checkUserSession()),
    signOut: () => dispatch(signOutStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NavMenu);