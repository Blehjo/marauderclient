import { Component, Dispatch } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { List, PersonCircle } from 'react-bootstrap-icons';

import { ConnectedProps, connect } from 'react-redux';
import { SetIsMaraudersOpen, setIsMaraudersOpen } from '../../store/messagebox/messagebox.action';
import { RootState } from '../../store/store';
import { CheckUserSession, SignOutStart, checkUserSession, signOutStart } from '../../store/user/user.action';
import { NavmenuContainer, PersonContainer } from '../../styles/navmenu/navmenu.styles';
import { ListContainer, NavContainer, SearchContainer } from '../../styles/poststab/poststab.styles';
import { Searchbar } from '../searchbar/searchbar.component';
import UserInterfaceCanvas from '../userinterfacecanvas/userinterfacecanvas.component';

interface INavMenu {
    show: boolean;
    sidebar: boolean;
    width: number;
}

type NavMenuProps = ConnectedProps<typeof connector>;

class NavMenu extends Component<NavMenuProps, INavMenu> {
    constructor(props: NavMenuProps) {
        super(props);
        this.state = {
            show: false,
            sidebar: this.props.messagebox,
            width: window.innerWidth
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleOpen(): void {
        this.props.openMarauders(!this.props.messagebox);
    }

    componentDidMount(): void {
        if (this.props.user == null) {
            this.props.checkUserSession();
        }
    }

    render() {
        const { show, width } = this.state;
        const { user } = this.props;
        return (
            <NavmenuContainer className="fixed-top">
                <Navbar style={{ border: "3px solid white", borderRadius: "5px", position: 'relative' }} variant="dark" bg="dark" sticky="top" expand="lg" >
                    <Container fluid>
                    <ListContainer>
                        <List type='button' size={25} onClick={this.handleOpen} style={{ padding: '.02rem', cursor: 'pointer' }} className="d-flex align-items-center"/>
                    </ListContainer>
                    <Navbar.Brand className='brand' href="/"><Image style={{ width: '1.5rem', height: '1.5rem', borderRadius: '.2rem', marginRight: '.5rem' }} src='/favicon.ico'/>Marauders</Navbar.Brand>
                        <Nav
                        className="me-auto nav-hidden"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        <NavContainer href="/dash">Dashboard</NavContainer>
                        <NavContainer href="/capcom">CapCom</NavContainer>
                        </Nav>
                        <SearchContainer>
                        <Searchbar/>
                        </SearchContainer>
                        <PersonContainer>
                            {user?.imageSource ? <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover', borderRadius: '1rem', border: 'white solid 1px' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user?.imageLink}`} onClick={this.handleClick}/> : <PersonCircle onClick={this.handleClick} size={30}/>}
                            <UserInterfaceCanvas signOut={this.props.signOut} user={user} check={this.props.checkUserSession}  handleClick={this.handleClick} show={show}/>
                        </PersonContainer>
                    </Container>
                </Navbar>
            </NavmenuContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        user: state.user.currentUser,
        messagebox: state.messagebox.isMaraudersOpen
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | SetIsMaraudersOpen | SignOutStart>) => ({
    checkUserSession: () => dispatch(checkUserSession()),
    openMarauders: (boolean: boolean) => dispatch(setIsMaraudersOpen(boolean)),
    signOut: () => dispatch(signOutStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NavMenu);