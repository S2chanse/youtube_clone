/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styled from "styled-components";

function RightMenu(props) {
  const [userIn, setUserIn] = useState(true);
  useEffect(() => {
    setUserIn(false);
  }, []);

  return (
    <>
      {userIn ? (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Signup</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/video/upload">Upload</StyledLink>
          <Nav.Link eventKey={2} href="/register">
            Logout
          </Nav.Link>
        </>
      )}
    </>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9b9d9e;
  padding-top: 9px;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: #9b9d9e;
    text-decoration: none;
  }
`;

export default RightMenu;
