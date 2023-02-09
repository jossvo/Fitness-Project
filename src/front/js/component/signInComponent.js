import React, { useContext, useEffect,useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../store/appContext";

export const SignInComponent = () => {
  const { store, actions } = useContext(Context);
  const [allowLogin,setAllowLogin]=useState(false)
	const navigate = useNavigate()
  const buttonNameRef = useRef()
  
  function verifyData(e){
    if(e.target.id==="inputLoginEmail")verifyEmail(e.target.id,"change")
    if(document.getElementById("inputLoginEmail").classList.contains("validEmail")
    && document.getElementById("inputLoginPassword").value != ""
    )setAllowLogin(true)
    else(setAllowLogin(false))
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
      return true;
    }
    else{
      if(type==="change"){
        elem.classList.remove("invalidEmail")
        elem.classList.add("questionableEmail")
      }else{
        elem.classList.remove("questionableEmail")
        elem.classList.add("invalidEmail")
      }
      document.getElementById("emailHelp").innerText = "Invalid email format"
      return false;
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
			console.error(resp)
			return;
		}
		console.log("Login exitoso")
	}

  return (
    <React.Fragment>
      <button
        ref={buttonNameRef}
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
                    onBlur={()=>verifyEmail("inputLoginEmail","focusOut")}
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
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg btn-signin"
                  id = "buttonSignIn"
                  data-bs-dismiss="modal"
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
