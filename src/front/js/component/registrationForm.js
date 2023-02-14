import { doc } from "prettier";
import React, { useContext, useEffect,useRef, useState} from "react";
import { Context } from "../store/appContext";

export const RegistrationForm = () => {
  const { store, actions } = useContext(Context);
  const [usernameMessage, setUsernameMessage]=useState("")
  const [emailMessage, setEmailMessage]=useState("")
  const [passwordMessage, setPasswordMessage]=useState("")
  const {setNewProfile}= actions

  let inputConfirmPassword = document.getElementById("inputConfirmPassword")


  async function submitSignup(e){
		e.preventDefault()
    const data = new FormData(e.target);
    data.set('user_type',data.get("flexRadioUsertype"))
    data.delete("flexRadioUsertype")

    let dataJson = {}
    Array.from(data.entries()).forEach(elem=>{dataJson[elem[0]] = elem[1]})

    if (dataJson.password!=dataJson.verifyPassword){
      setPasswordMessage("Confirm password doesn't match password")
      inputConfirmPassword.classList.add("invalidEmail")
      return false
    }

    let resp = await setNewProfile(data)
		if(resp !="ok"){
      if('email_msg'in resp) setEmailMessage(resp.email_msg)
      if('username_msg'in resp)setUsernameMessage(resp.username_msg)
    }else window.location.reload(true)

	}

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Join Now
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5
                className="modal-title text-center"
                id="exampleModalLabel"
              >
                Join Now to Fit Central
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form de Registro */}
              <form onSubmit={submitSignup} className="row g-3">
                <div className="col-md-12">
                  <label
                    htmlFor="inputSignupUsername"
                    className="form-label modal-label label-text"
                  >
                    Username
                  </label>
                  <input
                    required
                    name="username"
                    type="text"
                    className="form-control text-form"
                    id="inputSignupUsername"
                    aria-describedby="signupUsernameHelp"
                  />
                  <div id="signupUsernameHelp" className="incorrectFormInput form-text">   
                    {usernameMessage}         
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    hmtlfor="inputSignupFirstName"
                    className="form-label text-light label-text"
                  >
                    First Name
                  </label>
                  <input
                    required
                    name="first_name" 
                    type="text" 
                    className="form-control" 
                    id="inputSignupFirstName" />
                </div>
                <div className="col-md-6">
                  <label
                    hmtlfor="inputSignupLastName"
                    className="form-label text-light label-text"
                  >
                    LastName
                  </label>
                  <input
                    required
                    name="last_name"
                    type="text"
                    className="form-control"
                    id="inputSignupLastName"
                  />
                </div>

                <div className="col-md-12">
                  <label
                    hmtlfor="inputSignupEmail"
                    className="form-label text-light label-text"
                  >
                    Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="form-control"
                    pattern = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    id="inputSignupEmail"
                  />
                  <div id="signupEmailHelp" className="incorrectFormInput form-text"> 
                   {emailMessage}            
                  </div>
                </div>
                
                <div className="col-md-12">
                  <label
                    hmtlfor="inputSignupPassword"
                    className="form-label text-light label-text"
                  >
                    Password
                  </label>
                  <input
                    required
                    name="password"
                    type="password"
                    className="form-control"
                    id="inputSignupPassword"
                  />
                </div>
                <div className="col-md-12">
                  <label
                    hmtlfor="inputConfirmPassword"
                    className="form-label text-light label-text"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    name="verifyPassword"
                    id="inputConfirmPassword"
                  />
                  <div id="signupConfirmPaswordHelp" className="incorrectFormInput form-text">            
                    {passwordMessage}       
                  </div>
                </div>

                <div className="col-md-3">
                  <label className="form-label text-light label-text">Gender</label>
                  <select
                    name="gender"
                    className="form-select"
                    aria-label="Default select example"
                    id = "inputSignupGender"
                  >
                    <option defaultValue disabled>
                      Choose One
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label 
                  className="form-label text-light label-text" 
                  htmlFor="inputSignupBirthday">
                    Birthday
                  </label>
                  <input
                    required
                    name="birthday" 
                    className="form-control" 
                    id="inputSignupBirthday" 
                    type="date" 
                    placeholder="Enter your age" 
                  />
                </div>
                <div className="col-md-4">
                  <label hmtlfor="registerAs" className="form-label text-light label-text">
                    Register As
                  </label>
                  <div className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="flexRadioUsertype"
                      id="flexRadioUsertype1"
                      value="user"
                      defaultChecked
                    />
                    <label
                      className="form-check-label text-light"
                      hmtlfor="flexRadioUsertype1"
                    >
                      User
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="flexRadioUsertype"
                      value="coach"
                      id="flexRadioUsertype2"
                      
                    />
                    <label
                      className="form-check-label text-light"
                      hmtlfor="flexRadioUsertype2"
                    >
                      Coach
                    </label>
                  </div>
                </div>
                <div id="signupGeneralHelp" className="incorrectFormInput form-text">             
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-modal"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-warning" 
                  >
                    Create Account
                  </button>
                </div>
              </form>
              {/* Fin de Form de Registro */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
