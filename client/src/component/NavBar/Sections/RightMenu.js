/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const naviate = useNavigate();
  const [loginFlag, setLoginFlag] = useState(true);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("userId", null);
        setLoginFlag(false);
        naviate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("userId") == null) {
      setLoginFlag(false);
    }
  }, []);

  return (
    <>
      {loginFlag ? (
        <>
          <StyledLink to="/video/upload">Upload</StyledLink>
          <Nav.Link eventKey={2} href="#" onClick={logoutHandler}>
            Logout
          </Nav.Link>
        </>
      ) : (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Signup</StyledLink>
        </>
      )}
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

export default RightMenu;
