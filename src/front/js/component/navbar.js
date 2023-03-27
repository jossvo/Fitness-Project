//Imports y UseEffect para hacer el fecth de los datos para la libreria de entrenamientos ("Workouts")
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import { SignInComponent } from "./signInComponent";
import { RegistrationForm } from "./registrationForm";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const {logout}=actions
  let arrNav = []
  store.id? arrNav=[
    ["Programs","/programs"],
    ["Coaches","#"],
    ["FAQS","#"],
    ["Account",`${store.type==="u"?`/user/+${store.id}`:"/coach/settings/profile_view"}`],
    ["My Plans","#"]]
  : arrNav=[["Programs","/programs"],["Coaches","#"],["FAQS","#"]]

  async function logoutFunction(){
    let type ='user'
    if(store.type!='u')type='coach'
    let resp = await logout('user')
    window.location.reload();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg ms-auto ">
        <div className="container-fluid mx-5  ">
          <Link to="/">
            <span className="navbar-brand navbar-logo text-white" >
              <i className="fa-solid fa-dumbbell "></i>
              Fit Central
            </span>
          </Link>
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
            <ul className="navbar-nav ms-auto mx-5 d-flex align-items-center ">
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
              {store.id?(
                <button type="button" class="btn btn-danger navbar-items ms-5" onClick={logoutFunction}>Logout</button>
              ):""}
              {!store.id?<SignInComponent />:""}
              {!store.id?<RegistrationForm />:""}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
