import React, { useContext, useEffect,useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../store/appContext";

export const SignInComponent = () => {
  const { store, actions } = useContext(Context);
  const [allowLogin,setAllowLogin]=useState(false)

  let inputEmail = document.getElementById("inputLoginEmail")
  let inputPassword = document.getElementById("inputLoginPassword")
  let emailHelp = document.getElementById("emailHelp")
  let passwordHelp = document.getElementById("passwordHelp")
  
  function verifyData(e){
    emailHelp.innerText =""
    passwordHelp.innerText =""
    inputPassword.classList.remove("invalidEmail")
    if(e.target.id==="inputLoginEmail")verifyEmail(e.target.id)
    if(!inputEmail.classList.contains("invalidEmail") && inputEmail.value != ""
    )setAllowLogin(true)
    else(setAllowLogin(false))
  }

  function verifyEmail(id){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var inputMail = document.getElementById(id).value
    var elem = document.getElementById(id)
    if(inputMail.match(mailformat)){
      emailHelp.innerText = ""
      elem.classList.remove("invalidEmail")
    }
    else{
      elem.classList.add("invalidEmail")
      emailHelp.innerText = "Invalid email format"
    }
  }

  async function submitlogin(e){
		e.preventDefault()

		let data = new FormData(e.target)
		let email = data.get("email")
		let password = data.get("password")
    let type = document.querySelector('input[name="flexRadioLoginAs"]:checked').value
		let resp = await actions.login(email,password,type)
		if(resp !="ok"){
      console.log(resp.status)
      switch(resp.status){
        case "Wrong email":
          emailHelp.innerText = resp.msg
          inputEmail.classList.add("invalidEmail")
          break;
        case "Wrong password":
          passwordHelp.innerText = resp.msg
          inputPassword.classList.add("invalidEmail")
          break;
      }
      
    }else{ 
      console.log("Login exitoso")
      window.location.reload(true)
    }

	}

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-warning mx-5"
        data-bs-toggle="modal"
        data-bs-target="#signInModal"
      >
        Sign In
      </button>

      <div
        className="modal fade"
        id="signInModal"
        tabIndex="-1"
        aria-labelledby="signInModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1
                className="modal-title text-center text-light"
                id="signInModalLabel"
              >
                Welcome to Fit Central
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={submitlogin}>
                <div className="mb-3">
                <div className="col-md-12">
                  <label hmtlfor="registerAs" className="form-label text-light">
                    Login As
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioLoginAs"
                      id="flexRadioLoginAs1"
                      value="user"
                      defaultChecked
                    />
                    <label
                      className="form-check-label text-light"
                      hmtlfor="flexRadioLoginAs1"
                    >
                      User
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioLoginAs"
                      id="flexRadioLoginAs2"
                      value="coach"                      
                    />
                    <label
                      className="form-check-label text-light"
                      hmtlfor="flexRadioLoginAs2"
                    >
                      Coach
                    </label>
                  </div>
                </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputLoginEmail"
                    className="form-label modal-label label-text"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control text-form"
                    id="inputLoginEmail"
                    name="email"
                    aria-describedby="emailHelp"
                    onChange={verifyData}
                  />
                  <div id="emailHelp" className="form-text">                    
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputLoginPassword"
                    className="form-label modal-label label-text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputLoginPassword"
                    name="password"
                    onChange={verifyData}
                  />
                  <div id="passwordHelp" className="form-text">                    
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg btn-signin"
                  id = "buttonSignIn"
                  disabled={!allowLogin}
                >
                  Sign In
                </button>

                <a className="modal-a">Forgot your password?</a>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-modal"
                data-bs-dismiss="modal"
                id = "buttonCloseLoginModal"
              >
                Close
              </button>

              <button type="button" className="btn btn-warning btn-modal">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
