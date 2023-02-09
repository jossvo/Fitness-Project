import React, { useContext, useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../store/appContext";

export const SignInComponent = () => {
  const { store, actions } = useContext(Context);
	const navigate = useNavigate()
  const buttonNameRef = useRef()
  
  async function submitlogin(e){
		e.preventDefault()

		let data = new FormData(e.target)
		let email = data.get("email")
		let password = data.get("password")
		let resp = await actions.login(email,password)
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
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
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
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg btn-signin"
                  data-bs-dismiss="modal"
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
