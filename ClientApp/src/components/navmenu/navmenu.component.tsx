import { Component } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavmenuContainer, PersonContainer } from '../../styles/navmenu/navmenu.styles';
import { Person, PersonCircle } from 'react-bootstrap-icons';

class NavMenu extends Component {
    render() {
        return (
        <NavmenuContainer className="fixed-top">
            <Navbar style={{ border: "1px solid orangered" }} variant="dark" bg="dark" sticky="top" expand="lg" >
                <Container fluid>
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
                    <Button variant="outline-light">Search</Button>
                    </Form>
                    <PersonContainer>
                        <PersonCircle size={30}/>
                    </PersonContainer>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </NavmenuContainer>
        );
    }
}

export default NavMenu;