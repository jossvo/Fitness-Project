import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/userStyle.css";
import { ProfileInfo } from "../userComponents/profileinfo.jsx";

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

export const Home = ({navTitle="User"}) => {
  const { store, actions } = useContext(Context);

  return (
	<div style={{backgroundColor:"#e3e6e6", display:"flex"}}>
		<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
			<CDBSidebar textColor="rgba(254,202,0,1)" backgroundColor="rgba(27,28,26,1)">
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a href="/user123" className="text-decoration-none" style={{ color: 'inherit' }}>
						{navTitle}
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<NavLink exact to="/user123/profile" activeClassName="activeClicked">
						<CDBSidebarMenuItem icon="user">Profile Information</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/user123/billing" activeClassName="activeClicked">
						<CDBSidebarMenuItem icon="wallet">Billing</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/user123/security" activeClassName="activeClicked">
						<CDBSidebarMenuItem icon="lock">Security</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/user123/notifications" activeClassName="activeClicked">
						<CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

			</CDBSidebar>
		</div>
		<ProfileInfo/>
	</div>
  );
};
