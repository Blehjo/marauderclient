import { Component, Dispatch, FormEvent, MouseEvent, MouseEventHandler } from 'react';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { List, PersonCircle } from 'react-bootstrap-icons';

import { NavmenuContainer, PersonContainer } from '../../styles/navmenu/navmenu.styles';
import UserInterfaceCanvas from '../userinterfacecanvas/userinterfacecanvas.component';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/store';
import { CheckUserSession, SignOutStart, checkUserSession, signOutStart } from '../../store/user/user.action';
import { Searchbar } from '../searchbar/searchbar.component';

interface INavMenu {
    show: boolean;
}

type NavMenuProps = ConnectedProps<typeof connector>;

class NavMenu extends Component<NavMenuProps, INavMenu> {
    constructor(props: NavMenuProps) {
        super(props);
        this.state = {
            show: false,
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
                <Navbar style={{ border: "3px solid #E6C487", borderRadius: "5px" }} variant="dark" bg="dark" sticky="top" expand="lg" >
                    <Container fluid>
                    <List style={{ marginLeft: '.75rem', border: '1px solid white', marginRight: '1rem', padding: '.02rem', borderRadius: '.2rem', cursor: 'pointer' }} className="d-flex align-items-center"/>
                    <Navbar.Brand href="/">Marauders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    {/* <Navbar.Collapse id="navbarScroll"> */}
                        <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        <Nav.Link href="/dash">Dashboard</Nav.Link>
                        <Nav.Link href="/capcom">CapCom</Nav.Link>
                        </Nav>
                        <Searchbar/>
                        <PersonContainer>
                            <PersonCircle onClick={this.handleClick} size={30}/>
                            <UserInterfaceCanvas signOut={this.props.signOut} user={user}  handleClick={this.handleClick} show={show}/>
                        </PersonContainer>
                    {/* </Navbar.Collapse> */}
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