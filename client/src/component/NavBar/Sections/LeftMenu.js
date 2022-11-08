import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
      <Menu.Item key="mail">Navigation One</Menu.Item>
      <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu">
        <Menu.Item key="two">Navigation Two</Menu.Item>
        <Menu.Item key="three">Navigation Three</Menu.Item>
        <Menu.ItemGroup title="Item Group">
          <Menu.Item key="four">Navigation Four</Menu.Item>
          <Menu.Item key="five">Navigation Five</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
    // <Menu mode={props.mode}>
    //   <Menu.Item key="mail">
    //     <a href="/">Home</a>
    //   </Menu.Item>
    //   <SubMenu key="SubMenu" title={<span>Blogs</span>}>
    //     <MenuItemGroup title="Item 1">
    //       <Menu.Item key="setting:1">Option 1</Menu.Item>
    //       <Menu.Item key="setting:2">Option 2</Menu.Item>
    //     </MenuItemGroup>
    //     <MenuItemGroup title="Item 2">
    //       <Menu.Item key="setting:3">Option 3</Menu.Item>
    //       <Menu.Item key="setting:4">Option 4</Menu.Item>
    //     </MenuItemGroup>
    //   </SubMenu>
    // </Menu>
  );
}

export default LeftMenu;
