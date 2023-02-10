import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom"
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";

import moment from 'moment'
import { func } from "prop-types";

export function capitalize(str){
  if (str === null) return ""
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const ProfileInfo = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);
  const { updateAccountDetails , updateImage, setProfileImage} = actions
  const [preventProfileUpdate,setPreventProfileUpdate]= useState(true)
  const [preventImageUpdate,setPreventImageUpdate]= useState(true)
  const [allowPopulation, setAllowPopulation] = useState(false)

  //DOM Elements variables
  let inputuser =document.getElementById("inputUsername")
  let inputFirstName =document.getElementById("inputFirstName")
  let inputLastName =document.getElementById("inputLastName")
  let inputEmail =document.getElementById("inputEmailAddress")
  let inputGender =document.getElementById("inputGender")
  let inputBio =document.getElementById("textAreaBio")
  let inputBrithday = document.getElementById("inputBirthday")
  let inputHeight = document.getElementById("inputHeight")
  let inputWeight = document.getElementById("inputWeight")
  let profileImage = document.getElementById("profileImg")
  let inputProfileImage = document.getElementById("inputProfileImg")

  //Function to populate form with data
  useEffect(() => {
    async function fetchData(){
      actions.getProfile();
      actions.getDefaultPicture();
    }
    fetchData()
    setAllowPopulation(true)
  },[]);

  // useEffect and function to populate form with fetch data
  useEffect(() => {
    setData()
  },[store["userinfo"]]);

  async function setData(){
    if(store["userinfo"] && allowPopulation){
      let user = store["userinfo"]
      profileImage.src=user.profile_picture
      inputuser.value=capitalize(user.username)
      inputFirstName.value=capitalize(user.first_name)
      inputLastName.value=capitalize(user.last_name)
      inputEmail.value=user.email
      inputGender.value = capitalize(user.gender)
      if ( user.share_gender === null || user.share_gender === "false") document.getElementById("radioGenderFalse").checked = true
      else document.getElementById("radioGenderTrue").checked = true
      
      let birth = Date.parse(user.date_of_birth)
      let birthday = new Date(birth)
      birthday.setDate(birthday.getDate() + 1); //to fix birthday that show 1 day earlier
  
      inputBrithday.value = moment(birthday).format('YYYY-MM-DD');
      if ( user.share_age === null || user.share_age === "false") document.getElementById("radioAgeFalse").checked = true
      else document.getElementById("radioAgeTrue").checked = true
  
      inputHeight.value = user.height
      if ( user.share_height === null || user.share_height === "false") document.getElementById("radioHeightFalse").checked = true
      else document.getElementById("radioHeightTrue").checked = true
  
      inputWeight.value = user.weight
      if ( user.share_weight === null || user.share_weight === "false") document.getElementById("radioWeightFalse").checked = true
      else document.getElementById("radioWeightTrue").checked = true
      
      inputBio.value = user.bio
    }
  }

  //Onchange to validate if submit is allowed
  function verifyImage(e){
    inputProfileImage.files.length == 0?setPreventImageUpdate(true)
    :setPreventImageUpdate(false)
  }


  function verifyData(e){
    let elem = e.target
    if(elem.id==="inputEmailAddress")verifyEmail(elem.id,"change")

    let mandatoryArr = ["inputUsername","inputFirstName","inputLastName"]
    let helpId = elem.id.replace("input","")+"Help"

    if(mandatoryArr.includes(elem.id) && !elem.value){
      //Set inputHelp text
      document.getElementById(helpId).innerText = elem.id.replace("input","")+" can't be blank"
      //Set valid/invalid style class
      elem.classList.remove("invalidInput");
      elem.classList.add("invalidInput")
      setPreventProfileUpdate(true)
    }else if (mandatoryArr.includes(elem.id) && elem.value){
      document.getElementById(helpId).innerText = ""
      elem.classList.remove("invalidInput");
      elem.classList.add("validInput")
      setPreventProfileUpdate(false)
    }
  }

  function verifyEmail(id, type){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var inputMail = document.getElementById(id).value
    var elem = document.getElementById(id)
    if(inputMail.match(mailformat)){
      document.getElementById("emailHelp").innerText = ""
      elem.classList.remove("invalidEmail");
      elem.classList.remove("questionableEmail");
      elem.classList.add("validEmail");
      setPreventProfileUpdate(false)
      return true;
    }
    else{
      let emailHelp = document.getElementById("emailHelp")
      let helpText = "Invalid email format"
      if(type==="change"){
        if (inputMail){
          elem.classList.remove("invalidEmail")
          elem.classList.add("questionableEmail")
        }else{
          elem.classList.add("invalidEmail")
          elem.classList.remove("questionableEmail")
          helpText="Email can't be blank"
        }
      }else{
        elem.classList.remove("questionableEmail")
        elem.classList.add("invalidEmail")
      }
      emailHelp.innerText=helpText
      setPreventProfileUpdate(true)
      return false;
    }
  }

  // Update profile data from Account Details form
  async function updateData(e){
    e.preventDefault()
    const data = new FormData(e.target);
    data.set('share_gender',data.get("inputRadioGender"))
    data.delete("inputRadioGender")
    data.set('share_age',data.get("inputRadioAge"))
    data.delete("inputRadioAge")
    data.set('share_height',data.get("inputRadioHeight"))
    data.delete("inputRadioHeight")
    data.set('share_weight',data.get("inputRadioWeight"))
    data.delete("inputRadioWeight")

    let ok = await updateAccountDetails(data)
    if (ok)console.info("Información actualizada")
    console.log("hi")
    window.location.reload(true)
  }
  async function updateProfilePicture(e){
    e.preventDefault()
    const data = new FormData(e.target);
    let ok = await updateImage(data)
    if (ok)console.info("Información actualizada")
    window.location.reload(true)
  }

  return (
    <div className="profileDiv"
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
              <form onSubmit={updateProfilePicture}>
                <div className="card-body text-center">
                  <img
                    id="profileImg"
                    className="img-account-profile rounded-circle mb-2"
                    src=""
                    alt="profile picture"
                  />

                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>

                  <div className="mb-3" >
                    <label hmtlfor="inputProfileImg" className="form-label">
                      Select new profile picture:
                    </label>
                    <input 
                    name="file"
                    className="form-control form-control-sm" 
                    accept="image/png, image/jpeg" 
                    id="inputProfileImg" 
                    type="file" 
                    onChange={verifyImage}/>
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={preventImageUpdate}>
                    Upload profile picture
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={updateData}>

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
                      name="username"
                      onChange={verifyData}
                    />
                    <div id="UsernameHelp" className="form-text" style={{color:"red"}}>                    
                    </div>
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
                        name="first_name"
                        onChange={verifyData}
                      />
                      <div id="FirstNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
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
                        name="last_name"
                        onChange={verifyData}
                      />
                      <div id="LastNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
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
                      onChange={verifyData}
                      onBlur={()=>verifyEmail("inputEmailAddress","focusOut")}
                      name="email"
                    />
                    <div id="emailHelp" className="form-text" style={{color:"red"}}>                    
                    </div>
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
                            name={elem.title.toLocaleLowerCase()}
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
                                value={true}
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
                                value={false}
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
                                        name={elem.toLocaleLowerCase()}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor={"radio"+elem+"container"}>
                                        Share {elem}
                                    </label>
                                    <div className="d-flex align-items-center h-50" name={"radio"+elem+"container"}>
                                        <div className="w-50">
                                            <input
                                                name={"inputRadio"+elem}
                                                id={"radio"+elem+"True"}
                                                type="radio"
                                                value={true}
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"inputRadio"+elem}>
                                                Yes
                                            </label>
                                        </div>
                                        <div className="w-50">
                                            <input
                                                name={"inputRadio"+elem}
                                                id={"radio"+elem+"False"}
                                                type="radio"
                                                value={false}
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"inputRadio"+elem}>
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
                      <textarea className="form-control h-100" placeholder="Leave a comment here" id="textAreaBio" name="bio" ></textarea>
                    </div>
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={preventProfileUpdate} >
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
