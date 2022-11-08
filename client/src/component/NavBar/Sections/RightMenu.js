/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function RightMenu(props) {
  const [userIn, setUserIn] = useState(true);
  useEffect(() => {
    setUserIn(false);
  }, []);

  return (
    <Menu mode={props.mode}>
      {userIn ? (
        <>
          <Menu.Item key="mail">
            <Link to="/login">Signin</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="upload">
            <Link to="/video/upload">Upload</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a>Logout</a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default RightMenu;
