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
    store?.type==="u"? publicLink = `/user/${store.id}`
    :publicLink = `/coach/${store.id}`

    let arrNav =[{name:"Public view",icon:"eye",navlink:publicLink},
    {name:"Profile Information",icon:"user",navlink:"/settings/profile"},
    {name:"Security",icon:"lock",navlink:"/settings/security"},
    {name:"Billing",icon:"wallet",navlink:"/settings/billing"}
    ]
    if(store.id==="c"){
        arrNav[3]={name:"Programs",icon:"dumbell",navlink:"/settings/programs"}
    }

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