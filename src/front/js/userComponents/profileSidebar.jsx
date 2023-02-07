import React from "react";
import "../../styles/userStyle.css";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
//Source: https://www.devwares.com/blog/create-responsive-sidebar-in-react/

export const ProfileSidebar = ({navTitle="User"}) => {

  return (
	<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="rgba(254,202,0,1)" backgroundColor="rgba(27,28,26,1)">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a href="/user123" className="text-decoration-none" style={{ color: 'inherit' }}>
                    {navTitle}
                </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <NavLink exact="true" to="/user123" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="eye">Public view</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact="true" to="/user123/profile" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="user">Profile Information</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact="true" to="/user123/billing" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="wallet">Billing</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact="true" to="/user123/security" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="lock">Security</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>

        </CDBSidebar>
    </div>
  );
};

{/* <NavLink exact="true" to="/user123/notifications" activeclassname="activeClicked">
<CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
</NavLink> */}