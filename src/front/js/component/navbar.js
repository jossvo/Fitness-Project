//Imports y UseEffect para hacer el fecth de los datos para la libreria de entrenamientos ("Workouts")
import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import { SignInComponent } from "./signInComponent";
import { RegistrationForm } from "./registrationForm";
export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg ms-auto ">
        <div className="container-fluid mx-5  ">
          <a className="navbar-brand navbar-logo" href="#">
            <i className="fa-solid fa-dumbbell "></i>
            Fit Central
          </a>
          <button
            className="navbar-toggler navbar-dark "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto mx-5 d-flex align-items-right ">
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
              <SignInComponent />
              <RegistrationForm />

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
