import React, { useContext, useEffect,useRef} from "react";
import { Context } from "../store/appContext";
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
    const { store, actions } = useContext(Context);

    let publicLink =""
    store?.type==="u"? publicLink = `/user/${store.id}`
    :publicLink = `/coach/${store.id}`

  return (
	<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="rgba(254,202,0,1)" backgroundColor="rgba(27,28,26,1)">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a href="/settings" className="text-decoration-none" style={{ color: 'inherit' }}>
                    {navTitle}
                </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <NavLink exact="true" to={publicLink} activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="eye">Public view</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact="true" to="/settings/profile" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="user">Profile Information</CDBSidebarMenuItem>
                    </NavLink>
                    {store.type==="u"?
                    <NavLink exact="true" to="/settings/billing" activeclassname="activeClicked">
                        <CDBSidebarMenuItem icon="wallet">Billing</CDBSidebarMenuItem>
                    </NavLink>
                    :""
                    }
                    <NavLink exact="true" to="/settings/security" activeclassname="activeClicked">
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