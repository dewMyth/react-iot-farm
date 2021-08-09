
import React, {useEffect} from 'react'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { db } from '../firebase.config'
 

const DashboardNavbar = (props) => {

    useEffect(() => {
        db.child('FirebaseIOT').on('value', snapshot => {
            console.log(snapshot.val())
        })
     }, [])

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
                <Nav.Link href="#deets">More deets</Nav.Link>
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

