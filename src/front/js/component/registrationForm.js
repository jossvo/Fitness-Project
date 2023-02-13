import { doc } from "prettier";
import React, { useContext, useEffect,useRef, useState} from "react";
import { Context } from "../store/appContext";

export const RegistrationForm = () => {
  const { store, actions } = useContext(Context);
  const [allowSignUp,setAllowSignUp]=useState(false)
  const {setNewProfile}= actions

  let inputUsername = document.getElementById("inputSignupUsername")
  let usernameHelp = document.getElementById("signupUsernameHelp")
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

  async function submitSignup(e){
		e.preventDefault()
    const data = new FormData(e.target);
    data.set('user_type',data.get("flexRadioUsertype"))
    data.delete("flexRadioUsertype")

    let dataJSON = {}
    for (var pair of data.entries()) {
      dataJSON[pair[0]]=pair[1].toLocaleLowerCase()
    }

    let resp = await setNewProfile(data)
		if(resp !="ok"){
      if('email_msg'in resp){
        emailHelp.innerText = resp.email_msg
      }
      if('username_msg'in resp){
        usernameHelp.innerText = resp.username_msg
      }
    }else{ 
      console.log("Perfil creado")
      window.location.reload(true)
    }

	}

  function verifyData(e){
    let elem = e.target.id
    if(elem==="inputSignupEmail") verifyEmail()
    if(elem==="inputConfirmPassword") verifyPassword()
    usernameHelp.innerHTML=""
    emailHelp.innerHTML=""

    let bool = Boolean(
      inputUsername && inputUsername.value&& 
      inputFirstName && inputFirstName.value &&
      inputLastName && inputLastName.value &&
      (
        inputEmail && 
        inputEmail.value && 
        !inputEmail.classList.contains("invalidEmail")
      ) &&
      inputPassword && inputPassword.value &&
      (
        inputConfirmPassword && 
        inputConfirmPassword.value && 
        !inputConfirmPassword.classList.contains("invalidEmail")
      ) &&
      inputGender && inputGender.value &&
      inputBirthday && inputBirthday.value
      )

    setAllowSignUp(bool)
  }
  function verifyEmail(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailValue = inputEmail.value
    
    if(emailValue.match(mailformat)){
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
              <form onSubmit={submitSignup} className="row g-3">
                <div className="col-md-12">
                  <label
                    htmlFor="inputSignupUsername"
                    className="form-label modal-label label-text"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    onChange={verifyData}
                    type="text"
                    className="form-control text-form"
                    id="inputSignupUsername"
                    aria-describedby="signupUsernameHelp"
                  />
                  <div id="signupUsernameHelp" className="incorrectFormInput form-text">            
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
                    name="first_name"
                    onChange={verifyData} 
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
                    name="last_name"
                    onChange={verifyData}
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
                    name="email"
                    onChange={verifyData}
                    type="email"
                    className="form-control"
                    id="inputSignupEmail"
                  />
                  <div id="signupEmailHelp" className="incorrectFormInput form-text">             
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
                    name="password"
                    onChange={verifyData}
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
                    onChange={verifyData}
                    type="password"
                    className="form-control"
                    id="inputConfirmPassword"
                  />
                  <div id="signupConfirmPaswordHelp" className="incorrectFormInput form-text">                   
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
                    name="birthday"
                    onChange={verifyData} 
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
                      onChange={verifyData}
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
                      onChange={verifyData}
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
