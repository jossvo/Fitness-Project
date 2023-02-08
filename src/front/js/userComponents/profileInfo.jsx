import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";

import moment from 'moment'
import { func } from "prop-types";

export const ProfileInfo = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);
  const changeInputValue =event=>{
    event.target.value
  }
  //Function to populate form with data
  useEffect(() => {
    async function fetchData(){
      if (!store["usersDetail"]) actions.getDetails("users",1);
		}
		fetchData()
  },[]);

  useEffect(() => {
    setDataForm()
  },[store["usersDetail"]]);

  function capitalize(str){
    if (str === null) return ""
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function setDataForm(){
    if (store["usersDetail"]){
      let user = store["usersDetail"]
      document.getElementById("inputUsername").value=capitalize(user.username)
      document.getElementById("inputFirstName").value=capitalize(user.first_name)
      document.getElementById("inputLastName").value=capitalize(user.last_name)
      document.getElementById("inputEmailAddress").value=user.email
      document.getElementById("inputGender").value = capitalize(user.gender)
      if ( user.share_gender === null || user.share_gender === "false") document.getElementById("radioGenderFalse").checked = true
      else document.getElementById("radioGenderTrue").checked = true
  
      let birthday = Date.parse(user.date_of_birth)
      document.getElementById("inputBirthday").value = moment(birthday).format('YYYY-MM-DD');
      if ( user.share_age === null || user.share_age === "false") document.getElementById("radioAgeFalse").checked = true
      else document.getElementById("radioAgeTrue").checked = true
  
      document.getElementById("inputHeight").value = user.height
      if ( user.share_height === null || user.share_height === "false") document.getElementById("radioHeightFalse").checked = true
      else document.getElementById("radioHeightTrue").checked = true
  
      document.getElementById("inputWeight").value = user.weight
      if ( user.share_weight === null || user.share_weight === "false") document.getElementById("radioWeightFalse").checked = true
      else document.getElementById("radioWeightTrue").checked = true
      
      document.getElementById("textAreaBio").value = user.bio
    }
  }

  return (
    <div
      style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar />
      <div
        className="container overflow-auto"
        style={{ height: "95vh", width: "90%", marginTop: "5vh" }}
      >
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>

                <button className="btn btn-primary" type="button">
                  Upload profile picture
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {[
                    { title: "Gender", share: "Gender", type: "text" },
                    { title: "Birthday", share: "Age", type: "date" },
                  ].map((elem, index) => {

                    //Map for Gender and Birthday
                    let radioID1 = "radio" + elem.share + "True";
                    let radioID2 = "radio" + elem.share + "False";
                    let radioName = "inputRadio" + elem.share;

                    return (
                      <div className="row gx-3 mb-3 d-flex" key={index}>
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputPhone">
                            {elem.title}
                          </label>
                          <input
                            className="form-control"
                            id={"input"+elem.title}
                            type={elem.type}
                            placeholder={
                              "Enter your " + elem.share.toLowerCase()
                            }
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor={elem.share + "container"}>
                            Share {elem.share}
                          </label>
                          <div
                            className="d-flex w-100"
                            id={elem.share + "container"}
                          >

                            <div className="w-50">
                              <input
                                name={radioName}
                                id={radioID1}
                                type="radio"
                              />
                              <label className="small mb-1 radioLabel" htmlFor={radioName}>
                                Yes
                              </label>
                            </div>

                            <div className="w-50">
                              <input
                                name={radioName}
                                id={radioID2}
                                type="radio"
                              />
                              <label className="small mb-1 radioLabel" htmlFor={radioName}>
                                No
                              </label>
                            </div>
    
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="d-flex">
                    {["Height","Weight"].map((elem,index)=>{
                        return(
                            <div className="row gx-3 mb-3 d-flex" key={index}>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor={"input"+elem}>
                                        {elem} ({index==0?"cm":"kg"})
                                    </label>
                                    <input
                                        className="form-control"
                                        id={"input"+elem}
                                        type="text"
                                        placeholder={"Enter "+elem.toLocaleLowerCase()}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor={"radio"+elem+"container"}>
                                        Share {elem}
                                    </label>
                                    <div className="d-flex align-items-center h-50" name={"radio"+elem+"container"}>
                                        <div className="w-50">
                                            <input
                                                name={"radio"+elem}
                                                id={"radio"+elem+"True"}
                                                type="radio"
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"radio"+elem}>
                                                Yes
                                            </label>
                                        </div>
                                        <div className="w-50">
                                            <input
                                                name={"radio"+elem}
                                                id={"radio"+elem+"False"}
                                                type="radio"
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"radio"+elem}>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})
                    }  
                  </div>
                  <div className="row gx-3 mb-3 d-flex">
                    <label htmlFor="inputBio">Profile Bio</label>
                    <div className="col-md-12 form-floating" id="inputBio" style={{height:"20vh"}}>
                      <textarea className="form-control h-100" placeholder="Leave a comment here" id="textAreaBio" ></textarea>
                    </div>
                  </div>

                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
