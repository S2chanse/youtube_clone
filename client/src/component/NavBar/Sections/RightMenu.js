/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  return (
    <>
      {user.userData && !user.userData.isAuth ? (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Signup</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/video/upload">Upload</StyledLink>
          <Nav.Link eventKey={2} href="#" onClick={logoutHandler}>
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
