import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";
import {capitalize} from "./profileInfo.jsx";
import { func } from "prop-types";

export const UserPublic = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);

    //Function to populate form with data
    useEffect(() => {
      async function fetchData(){
        actions.getDetails("users",1);
      }
      fetchData()
    },[]);
  
    useEffect(() => {
      setData()
    },[store["usersDetail"]]);

    let user = store["usersDetail"]
    async function setData(){
      if(store["usersDetail"]){
        document.getElementById("publicViewUserFullName").innerText=capitalize(user.first_name)+" "+capitalize(user.last_name)
        document.getElementById("publicViewUserBio").innerText=capitalize(user.bio)
      }
    }

  return (
    <div className="profileDiv" style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar />
      <div className="overflow-hidden" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div id="profileBanner" style={{ minWidth: "70.5vw", height: "35vh", position: "relative" }}
        >
          <img src="https://picsum.photos/seed/picsusdf/1500/1500" alt=""
            className="w-100" style={{ position: "absolute", clip: "rect(0, 100vw, 35vh, 0)" }}
          />
        </div>
        <div id="profileP"
          style={{ width: "100%", height: "15vw",
            marginLeft: "5%", marginBottom:"10%"
          }}>
          <img id="profilePic" src="https://picsum.photos/seed/picsusm/200/200"
            className="img-thumbnail rounded mx-auto d-block" alt=""
            style={{ height: "100%", width: "15vw%", position: "relative", top: "1.5vh", marginLeft:"0px"}}
          />
          <div style={{width:"100%"}}>
            <h1 id="publicViewUserFullName" style={{fontSize:"240%"}}></h1>
          </div>
        </div>
        <div
          className="profileContent"
          style={{postion:"relative",top:"10vh", backgroundColor:"white", paddingLeft: "5%", paddingRight: "5%",paddingTop:"2.5%" , height: "100%", width: "100%" }}
        >
          
          {user?.bio===""?"":<h1 > About </h1>}
          <p id="publicViewUserBio" className="overflow-auto" style={{textAlign: "justify", textJustify: "inter-word"}}></p>
        </div>
      </div>
    </div>
  );
};
