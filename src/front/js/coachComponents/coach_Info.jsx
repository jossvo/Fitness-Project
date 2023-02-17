import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom"
import { ProfileSidebar } from "../userComponents/profileSidebar.jsx";
import "../../styles/userStyle.css";


import moment from 'moment'

export const CoachInfo = () => {
  const { store, actions } = useContext(Context);
  const { updateAccountDetails , updateImage, setProfileImage} = actions
  const [allowPopulation, setAllowPopulation] = useState(false)
  const [usernameMessage, setUsernameMessage]=useState("")
  const [emailMessage, setEmailMessage]=useState("")

  //Function to populate form with data
  useEffect(() => {
    async function fetchData(){
      actions.getProfile();
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
      document.getElementById("profileImg").src=user.profile_picture
      document.getElementById("inputUsername").value=user.username
      document.getElementById("inputFirstName").value=user.first_name
      document.getElementById("inputLastName").value=user.last_name
      document.getElementById("inputEmailAddress").value=user.email
      document.getElementById("inputGender").value = user.gender
      if ( user.share_gender === null || user.share_gender === false) document.getElementById("radioGenderFalse").checked = true
      else document.getElementById("radioGenderTrue").checked = true
      
      let birth = Date.parse(user.date_of_birth)
      let birthday = new Date(birth)
      birthday.setDate(birthday.getDate() + 1); //to fix birthday that show 1 day earlier
  
      document.getElementById("inputBirthday").value = moment(birthday).format('YYYY-MM-DD');
      if ( user.share_age === null || user.share_age === false) document.getElementById("radioAgeFalse").checked = true
      else document.getElementById("radioAgeTrue").checked = true
      
      document.getElementById("textAreaBio").value = user.bio
    }
  }

  // Update profile data from Account Details form
  async function updateData(e){
    e.preventDefault()
    const data = new FormData(e.target);
    data.set('share_gender',data.get("inputRadioGender"))
    data.set('share_age',data.get("inputRadioAge"))

    let resp = await updateAccountDetails(data)
    if(resp !="ok"){
      if('email_msg'in resp) setEmailMessage(resp.email_msg)
      if('username_msg'in resp)setUsernameMessage(resp.username_msg)
    }else window.location.reload(true)
  }
  async function updateProfilePicture(e){
    e.preventDefault()
    const data = new FormData(e.target);
    let resp = await updateImage(data)
    if (resp)window.location.reload(true)
  }
  function resetMessage(){
    setEmailMessage('')
    setUsernameMessage('')
  }

  return (
    <div className="profileDiv"
      style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar navTitle="Coach"/>
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
                    required 
                    name="file"
                    className="form-control form-control-sm" 
                    accept="image/png, image/jpeg" 
                    id="inputProfileImg" 
                    type="file" 
                    />
                  </div>

                  <button className="btn btn-primary" type="submit">
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
                      Username (how your name will appear to users on the
                      site)
                    </label>
                    <input
                      required
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      onChange={resetMessage}
                    />
                    <div id="UsernameHelp" className="form-text" style={{color:"red"}}>
                    {usernameMessage}                    
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        required
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        name="first_name"
                      />
                      <div id="FirstNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        required
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        name="last_name"
                      />
                      <div id="LastNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
                    </div>
                  </div>

                  <div className="emailInputDiv mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      required
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      pattern = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                      name="email"
                      onChange={resetMessage}
                    />
                    <div id="emailHelp" className="form-text" style={{color:"red"}}> 
                      {emailMessage}                   
                    </div>
                  </div>

                  <div className="row gx-3 mb-3 d-flex">
                    <div className="col-md-6">
                      <label className="small mb-1">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        aria-label="Default select example"
                        id = "inputGender"
                      >
                        <option defaultValue disabled>
                          Choose One
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="Gendercontainer">
                        Share Gender
                      </label>
                      <div className="d-flex w-100" id="Gendercontainer">
                        <div className="w-50">
                          <input
                            name="inputRadioGender"
                            id="radioGenderTrue"
                            type="radio"
                            value={true}
                          />
                          <label className="small mb-1 radioLabel" htmlFor="inputRadioGender">
                            Yes
                          </label>
                        </div>

                        <div className="w-50">
                          <input
                            name="inputRadioGender"
                            id="radioGenderFalse"
                            type="radio"
                            value={false}
                          />
                          <label className="small mb-1 radioLabel" htmlFor="inputRadioGender">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row gx-3 mb-3 d-flex">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputPhone">
                            Birthday
                          </label>

                          <input
                            className="form-control"
                            id="inputBirthday"
                            type="date"
                            placeholder="Enter your date of birth"
                            name="birthday"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="Agecontainer">
                            Share Age
                          </label>
                          <div
                            className="d-flex w-100"
                            id="Agecontainer"
                          >

                            <div className="w-50">
                              <input
                                name="inputRadioAge"
                                id="radioAgeTrue"
                                type="radio"
                                value={true}
                              />
                              <label className="small mb-1 radioLabel" htmlFor="inputRadioAge">
                                Yes
                              </label>
                            </div>

                            <div className="w-50">
                              <input
                                name="inputRadioAge"
                                id="radioAgeFalse"
                                type="radio"
                                value={false}
                              />
                              <label className="small mb-1 radioLabel" htmlFor="inputRadioAge">
                                No
                              </label>
                            </div>
    
                          </div>
                        </div>
                      </div>

                  <div className="row gx-3 mb-3 d-flex">
                    <label htmlFor="inputBio">Profile Bio</label>
                    <div className="col-md-12 form-floating" id="inputBio" style={{height:"20vh"}}>
                      <textarea className="form-control h-100" placeholder="Leave a comment here" id="textAreaBio" name="bio" ></textarea>
                    </div>
                  </div>

                  <button className="btn btn-primary" type="submit">
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
