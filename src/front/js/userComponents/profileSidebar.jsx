import React, { useContext, useEffect,useRef} from "react";
import { Context } from "../store/appContext";
import { NavLink ,useNavigate} from 'react-router-dom';
import "../../styles/userStyle.css";
 
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

//Source: https://www.devwares.com/blog/create-responsive-sidebar-in-react/

export const ProfileSidebar = ({navTitle="User"}) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem("accessToken"))navigate("/")
    },[])

    let publicLink =""
    let prefix = ""
    if(store.type==="u") publicLink = `/user/${store.id}`
    else{
        publicLink = `/coach/${store.id}`
        prefix = "/coach"
    }

    let arrNav =[{name:"Public view",icon:"eye",navlink:publicLink},
    {name:"Profile Information",icon:"user",navlink:prefix+"/settings/profile"},
    {name:"Security",icon:"lock",navlink:prefix+"/settings/security"},
    {name:"Billing",icon:"wallet",navlink:"/settings/billing"}
    ]
    if(store.type==="c"){
        arrNav[3]={name:"Create program",icon:"calendar",navlink:prefix+"/settings/new_program"}
    }

  return (
	<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#E1B12C" backgroundColor="rgba(27,28,26,1)" toggled="false">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a href="/settings" className="text-decoration-none" style={{ color: 'inherit' }}>
                    {navTitle}
                </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    {arrNav.map((elem,index)=>{
                        return(
                            <NavLink exact="true" key={index} to={elem.navlink} activeclassname="activeClicked">
                                <CDBSidebarMenuItem icon={elem.icon}>{elem.name}</CDBSidebarMenuItem>
                            </NavLink>
                        )
                    })
                    }
                </CDBSidebarMenu>
            </CDBSidebarContent>

        </CDBSidebar>
    </div>
  );
};

{/* <NavLink exact="true" to="/user123/notifications" activeclassname="activeClicked">
<CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
</NavLink> */}