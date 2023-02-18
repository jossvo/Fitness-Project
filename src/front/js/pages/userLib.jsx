import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userLibStyle.css";
import { element } from "prop-types";
import { Link } from "react-router-dom";

export const UserLibrary = () => {
  const { store, actions } = useContext(Context);

  //Function to populate form with data
  useEffect(() => {
    async function fetchData() {
      actions.getList("workouts");
    }
    fetchData();
  }, []);

  console.log(store["workouts"]);

  return (
    <div className="d-flex-column w-100 justify-content-center">
      <h1 className="page-title text-center my-4 page-title-workoutLib w-100">
        My plans
      </h1>
      <div className="container">
        <div className="row">
          {store.workouts?.map((element) => {
            return (
              <div key={element.uid} className="col-3 my-4">
                <div className="card">
                  <h5 className="card-title-section text-center title-container">
                    {element.name}
                  </h5>
                  <ul className="list-group list-group-flush list-group-workouts">
                    <li>
                      <img
                        className="workout-library-img"
                        src={element.wk_image}
                        alt="Workout Image"
                      />
                    </li>
                    <li className="list-group-item workout-item workout-description bg-light ">
                      {element.description}
                    </li>
                    <li className="list-group-item workout-item">
                      <i className="fa-solid fa-calendar-day mx-2"></i>
                      <span>Days per week: </span>
                      {element.days_per_week}
                    </li>
                    <li className="list-group-item workout-item bg-light ">
                      <i className="fa-solid fa-calendar-days mx-2"></i>
                      <span>Weeks: </span>
                      {element.weeks}
                    </li>
                    <li className="list-group-item workout-item ">
                      <i className="fa-solid fa-square-poll-vertical mx-2"></i>
                      <span>Difficulty: </span>
                      {element.difficulty}
                    </li>
                    <li className="list-group-item workout-item bg-light ">
                      <i className="fa-solid fa-user mx-2"></i>
                      <span>Coach: </span>
                      {element.coach_name}
                    </li>
                  </ul>
                  {/* <link to="#" className="btn btn-warning">
                  Start Now
                </link> */}
                </div>
                <div className="btn-container-workouts my-3">
                  <Link to="#" className="btn btn-warning btn-workout-library">
                    START
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
