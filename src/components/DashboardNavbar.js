import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { Navbar, Container, Nav } from "react-bootstrap";

const DashboardNavbar = (props) => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("cannot logout");
    }
  }

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
              <Nav.Link href="#deets">
                {currentUser ? currentUser.email : ""}
              </Nav.Link>
              {currentUser ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default DashboardNavbar;
