import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";

export const UserPublic = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);

  return (
    <div style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
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
            <h1 style={{fontSize:"280%"}}>Josue Vilchis</h1>
          </div>
        </div>
        <div
          className="profileContent"
          style={{postion:"relative",top:"10vh", backgroundColor:"white", paddingLeft: "5%", paddingRight: "5%",paddingTop:"2.5%" , height: "100%", width: "100%" }}
        >
          <h1> About me </h1>
          <p className="overflow-auto" style={{textAlign: "justify", textJustify: "inter-word"}}> Lorem ipsum odor amet, consectetuer adipiscing elit. Vestibulum ipsum cubilia ullamcorper amet himenaeos id sollicitudin. Eleifend tortor massa primis phasellus vestibulum euismod ad proin. Facilisis nisi praesent integer venenatis dolor sollicitudin sociosqu posuere. Himenaeos laoreet feugiat luctus fringilla commodo tincidunt cursus proin? Non bibendum lacus augue nunc tincidunt rhoncus curabitur nec. Himenaeos duis senectus facilisis ligula vitae nisl tellus. Maecenas fames sociosqu sociosqu lobortis dapibus mi consequat donec et. Eu primis lacus tellus; imperdiet habitant natoque eleifend. </p>
        </div>
      </div>
    </div>
  );
};
