/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function RightMenu(props) {
  const [userIn, setUserIn] = useState(true);
  useEffect(() => {
    setUserIn(false);
  }, []);

  return (
    <>
      {userIn ? (
        <>
          <Nav.Link href='#'>
            <StyledLink to={'/login'}>Login</StyledLink>
          </Nav.Link>
          <Nav.Link eventKey={2} href='#'>
            <StyledLink to={'/register'}>Signup</StyledLink>
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link href='#'>
            <StyledLink to={'/video/upload'}>Upload</StyledLink>
          </Nav.Link>
          <Nav.Link eventKey={2} href='/register'>
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
