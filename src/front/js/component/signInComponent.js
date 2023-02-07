import React from "react";
export const SignInComponent = () => {
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-warning btn-lg btn-block mx-5"
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
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label modal-label label-text"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control text-form"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label modal-label label-text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg btn-signin"
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
