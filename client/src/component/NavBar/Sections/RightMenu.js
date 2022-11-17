/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { USER_SERVER } from '../../../Config';
import { clearUser } from '../../../_reducers/userSlice';

function RightMenu(props) {
  const naviate = useNavigate();
  const [loginFlag, setLoginFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem('userId', null);
        dispatch(clearUser());
        naviate('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  useEffect(() => {}, [user]);

  return (
    <>
      {!user.isAuth ? (
        <>
          <StyledLink to='/login'>Login</StyledLink>
          <StyledLink to='/register'>Signup</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to='/video/upload'>Upload</StyledLink>
          <Nav.Link eventKey={2} href='#' onClick={logoutHandler}>
            Logout
          </Nav.Link>
        </>
      )}
    </>
  );
}

export default RightMenu;
