import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/workoutLibStyle.css";
import { Context } from "../store/appContext";
import { SideBar } from "../component/workoutSideBar";

export const Workouts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      actions.getList("workouts");
    }
    fetchData();
  }, []);

  console.log(store["workouts"]);

  return (
    <>
      <div className="workout-main-container">
        <div>
          <SideBar />
        </div>
        <div className="d-flex-column w-100 justify-content-center">
          <h1 className="page-title text-center my-4 page-title-workoutLib w-100">
            Workout Library
          </h1>
          <div className="container  ">
            <div className="row ">
              {store.workouts?.map((element) => (
                <div
                  key={element.uid}
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3"
                >
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
                        <i class="fa-solid fa-calendar-day mx-2"></i>
                        <span>Days per week: </span>
                        {element.days_per_week}
                      </li>
                      <li className="list-group-item workout-item bg-light ">
                        <i class="fa-solid fa-calendar-days mx-2"></i>
                        <span>Weeks: </span>
                        {element.weeks}
                      </li>
                      <li className="list-group-item workout-item ">
                        <i class="fa-solid fa-square-poll-vertical mx-2"></i>
                        <span>Difficulty: </span>
                        {element.difficulty}
                      </li>
                      <li className="list-group-item workout-item bg-light ">
                        <i class="fa-solid fa-user mx-2"></i>
                        <span>Coach: </span>
                        {element.coach_name}
                      </li>
                    </ul>
                  </div>
                  <div className="btn-container-workouts my-3">
                    <Link
                      to="#"
                      className="btn btn-warning btn-workout-library"
                    >
                      Buy
                    </Link>
                    <Link
                      to={`/workout/${element.uid}`}
                      className="btn btn-secondary btn-workout-library"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
