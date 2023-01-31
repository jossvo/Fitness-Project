import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/userStyle.css";

export const ProfileInfo = ({navTitle="User"}) => {
    const { store, actions } = useContext(Context);
  
    return (
        <div style={{width:"100%", display:"flex", flexDirection:"column"}}>
            <div id="profileBanner" 
            style={{minWidth:"70.5vw",height:"35vh",position: "relative"}}>
                <img src="https://picsum.photos/seed/picsusdf/1500/1500" alt="" 
                className="w-100" style={{position: "absolute",clip: "rect(0, 100vw, 35vh, 0)"}}
                />
            </div>
            <div id="profileP" style={{position: "relative", top:"-10.5vh", width:"15vw", height:"15vw", marginLeft:"42.5%"}}>
                <img src="https://picsum.photos/seed/picsusm/200/200" 
                className="img-thumbnail rounded mx-auto d-block" alt="" 
                style={{height:"100%",width:"100%"}}
                />
            </div>
            <div className="profileContent">
                <p>Hi im the content</p>
            </div>
        </div>
    );
  };