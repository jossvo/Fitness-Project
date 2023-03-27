import React, { useContext, useEffect,useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../store/appContext";

export const SignInComponent = () => {
  const { store, actions } = useContext(Context);
  const [passwordMessage,setPasswordMessage] = useState("")
  const [emailMessage,setEmailMessage]=useState("")

  async function submitlogin(e){
		e.preventDefault()

		let data = new FormData(e.target)
		let email = data.get("email")
		let password = data.get("password")
    let type = data.get("flexRadioLoginAs")

		let resp = await actions.login(email,password,type)
		if(resp !="ok"){
      switch(resp.status){
        case "Wrong email":
          setEmailMessage(resp.msg)
          setPasswordMessage('')
          break;
        case "Wrong password":
          setPasswordMessage(resp.msg)
          setEmailMessage('')
          break;
      }      
    }else window.location.reload(true)
	}
  function resetMessage(){
    setEmailMessage('')
    setPasswordMessage('')
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
                    required
                    type="email"
                    className="form-control text-form"
                    id="inputLoginEmail"
                    name="email"
                    aria-describedby="emailHelp"
                    pattern = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    onChange={resetMessage}
                  />
                  <div id="emailHelp" className="form-text">  
                  {emailMessage}                  
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
                    required
                    type="password"
                    className="form-control"
                    id="inputLoginPassword"
                    name="password"
                    onChange={resetMessage}
                  />
                  <div id="passwordHelp" className="form-text"> 
                  {passwordMessage}                   
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg btn-signin"
                  id = "buttonSignIn"
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
