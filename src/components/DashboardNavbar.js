
import React from 'react'

import { Navbar, Container, Nav } from 'react-bootstrap' 

const DashboardNavbar = (props) => {
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">IoT FARM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">{props.currentUser ? props.currentUser.email : "No User/Device"}</Nav.Link>
                <Nav.Link onClick={props.handleLogout}>
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </React.Fragment>
    )
}

export default DashboardNavbar;

