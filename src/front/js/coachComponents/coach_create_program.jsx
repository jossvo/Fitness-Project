import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom"
import Select from "react-select";
import { ProfileSidebar } from "../userComponents/profileSidebar.jsx";
import { ProgramTemplate } from "./program_template.jsx";
import "../../styles/coachStyle.css";


export const CreateProgram = () => {
  return (
    <div className="profileDiv"
      style={{ backgroundColor: "#e3e6e6", display: "flex"}}
    >
      <ProfileSidebar navTitle="Coach"/>
      <ProgramTemplate/>
    </div>
  );
};
