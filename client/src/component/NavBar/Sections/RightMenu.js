/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';

function RightMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key='logout'>
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
