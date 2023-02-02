import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg ms-auto">
        <div className="container-fluid mx-5 ">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-dumbbell"></i>
            Fit Central
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mx-5 d-flex align-items-center">
              <Link to="#">
                <span className="navbar-items">
                  <i className=""></i>Programs
                </span>
              </Link>
              <Link to="#">
                <span className="navbar-items">
                  <i className=""></i>Coaches
                </span>
              </Link>
              <Link to="#">
                <span className="navbar-items">
                  <i className=""></i>FAQS
                </span>
              </Link>
              <Link to="#">
                <span className="navbar-items">
                  <i className=""></i>Account
                </span>
              </Link>
              <Link to="#">
                <span className="navbar-items">
                  <i className=""></i>My Plans
                </span>
              </Link>
              <Link to="#">
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block mx-5"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Join Now
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content bg-dark">
                      <div className="modal-header">
                        <h1
                          className="modal-title text-center"
                          id="exampleModalLabel"
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
                        
                          <button
                            type="button"
                            className="btn btn-warning btn-modal"
                          >
                            Create Account
                          </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
