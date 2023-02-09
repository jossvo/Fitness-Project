//Imports y UseEffect para hacer el fecth de los datos para la libreria de entrenamientos ("Workouts")
import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import { SignInComponent } from "./signInComponent";
import { RegistrationForm } from "./registrationForm";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let arrNav = []
  store.id? arrNav=[
    ["Programs","#"],
    ["Coaches","#"],
    ["FAQS","#"],
    ["Account",`/${store.type==="u"?"user":"coach"}/${store.id}`],
    ["My Plans","#"]]
  : arrNav=[["Programs","#"],["Coaches","#"],["FAQS","#"]]

  return (
    <div>
      <nav className="navbar navbar-expand-lg ms-auto ">
        <div className="container-fluid mx-5  ">
          <a className="navbar-brand navbar-logo" href="/">
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
              {
              arrNav.map((elem,index)=>{
                return(
                  <Link to={elem[1]} key={index}>
                    <span className="navbar-items">
                      <i className=""></i>{elem[0]}
                    </span>
                  </Link>
                )
              })
              }

              {!store.id?<SignInComponent />:""}
              {!store.id?<RegistrationForm />:""}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
