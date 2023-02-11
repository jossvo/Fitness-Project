import { doc } from "prettier";
import React, { useContext, useEffect,useRef, useState} from "react";

export const RegistrationForm = () => {
  const [allowSignUp,setAllowSignUp]=useState(false)

  let inputUsername = document.getElementById("inputSignupUsername")
  let inputFirstName = document.getElementById("inputSignupFirstName")
  let inputLastName = document.getElementById("inputSignupLastName")
  let inputEmail = document.getElementById("inputSignupEmail")
  let emailHelp = document.getElementById("signupEmailHelp")
  let inputPassword = document.getElementById("inputSignupPassword")
  let inputConfirmPassword = document.getElementById("inputConfirmPassword")
  let passwordHelp = document.getElementById("signupConfirmPaswordHelp")
  let inputGender = document.getElementById("inputSignupGender")
  let inputBirthday = document.getElementById("inputSignupBirthday")
  let inputUserType = document.getElementById("flexRadioUsertype")

  function verifyData(e){

  }
  function verifyEmail(e){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var inputMail = e.target.value
    
    if(inputMail.match(mailformat)){
      emailHelp.innerText = ""
      inputEmail.classList.remove("invalidEmail")
    }
    else{
      inputEmail.classList.add("invalidEmail")
      emailHelp.innerText = "Invalid email format"
    }
  }
  function verifyPassword(){
    if(inputPassword.value===inputConfirmPassword.value){
      inputConfirmPassword.classList.remove("invalidEmail")
      passwordHelp.innerText=""
    }else{
      inputConfirmPassword.classList.add("invalidEmail")
      passwordHelp.innerText="Confirm password doesn't match password"
    }
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
              <form className="row g-3">
                <div className="col-md-12">
                  <label
                    htmlFor="inputSignupUsername"
                    className="form-label modal-label label-text"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control text-form"
                    id="inputSignupUsername"
                    aria-describedby="signupUsernameHelp"
                  />
                  <div id="signupUsernameHelp" className="form-text">
                    Hola soy el username                    
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    hmtlfor="inputSignupFirstName"
                    className="form-label text-light label-text"
                  >
                    First Name
                  </label>
                  <input type="email" className="form-control" id="inputSignupFirstName" />
                </div>
                <div className="col-md-6">
                  <label
                    hmtlfor="inputSignupLastName"
                    className="form-label text-light label-text"
                  >
                    LastName
                  </label>
                  <input
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
                    type="email"
                    className="form-control"
                    id="inputSignupEmail"
                    onChange={verifyEmail}
                  />
                  <div id="signupEmailHelp" className="form-text">             
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
                    type="password"
                    className="form-control"
                    id="inputConfirmPassword"
                    onChange={verifyPassword}
                  />
                  <div id="signupConfirmPaswordHelp" className="form-text">                   
                  </div>
                </div>

                <div className="col-md-3">
                  <label className="form-label text-light label-text">Gender</label>
                  <select
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
                  className="form-control" 
                  id="inputSignupBirthday" 
                  type="date" 
                  placeholder="Enter your age" 
                  name="birthday"/>
                </div>
                <div className="col-md-4">
                  <label hmtlfor="registerAs" className="form-label text-light label-text">
                    Register As
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioUsertype"
                      id="flexRadioUsertype1"
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
                      className="form-check-input"
                      type="radio"
                      name="flexRadioUsertype"
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
                <div id="signupGeneralHelp" className="form-text">
                      Hola soy el general                    
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
                    disabled={!allowSignUp}>
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
