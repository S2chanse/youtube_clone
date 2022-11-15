import React, { useState } from "react";
import RightMenu from "./Sections/RightMenu";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import styled from "styled-components";
import "./Sections/Navbar.css";

function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <StyledLink to={"/"}>Main</StyledLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/subscription">Subscription</StyledLink>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <RightMenu />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9b9d9e;
  padding-top: 9px;
  margin-right: 2rem;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: #9b9d9e;
    text-decoration: none;
  }
`;

export default NavBar;
