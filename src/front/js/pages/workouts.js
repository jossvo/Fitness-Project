import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/workoutLibStyle.css";
import { Context } from "../store/appContext";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

export const Workouts = () => {
  const { store, actions } = useContext(Context);
  const [searchName, setSearchName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    async function fetchData() {
      actions.getList("workouts");
    }
    fetchData();
  }, []);

  const inputSearch = (event) => {
    setSearchName(event.target.value);
  };

  const inputDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <>
      <div className="workout-main-container">
        <div>
          {/* Aca empieza el Sidebar */}
          <CDBSidebar
            toggled="false"
            textColor="#333"
            backgroundColor="#f0f0f0"
            className="workout-sidebar-title sidebar-height "
          >
            <CDBSidebarHeader prefix={<i className="fa fa-bars " />}>
              Find the Workout or Coach
            </CDBSidebarHeader>
            <CDBSidebarContent>
              <CDBSidebarMenu>
                <CDBSidebarMenuItem icon="search">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Type to search..."
                    value={searchName}
                    onChange={inputSearch}
                  />
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem icon="sticky-note">
                  Filter by Difficulty
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem className="mx-5 my-2">
                  {" "}
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="difficulty"
                        id="easy"
                        value="Easy"
                        checked={selectedDifficulty === "Easy"}
                        onChange={inputDifficulty}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Easy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="difficulty"
                        id="medium"
                        value="Medium"
                        checked={selectedDifficulty === "Medium"}
                        onChange={inputDifficulty}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Medium
                      </label>
                    </div>
                    <div className="form-check disabled">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="difficulty"
                        id="hard"
                        value="Hard"
                        checked={selectedDifficulty === "Hard"}
                        onChange={inputDifficulty}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios3"
                      >
                        Hard
                      </label>
                    </div>
                  </div>
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter
              style={{ textAlign: "center" }}
            ></CDBSidebarFooter>
          </CDBSidebar>
          {/* Aca Finaliza el Sidebar */}
        </div>
        <div className="d-flex-column w-100 justify-content-center">
          <h1 className="page-title text-center my-4 page-title-workoutLib w-100">
            Workout Library
          </h1>

          <div className="container  ">
            <div className="row ">
              {store.workouts?.filter((element) =>element.name.toLowerCase().includes(searchName.toLowerCase()) ||
                    element.coach_name.toLowerCase().includes(searchName.toLowerCase())
                ).filter((element) => selectedDifficulty ? element.difficulty === selectedDifficulty : true).map((element, index) => (
                  <div
                    className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3"
                    key={element.id || index}
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
                    </div>
                    <div className="btn-container-workouts my-3">
                      <Link
                        to="#"
                        className="btn btn-warning btn-workout-library"
                      >
                        Buy
                      </Link>
                      <Link
                        to={`/workout/${element.id}`}
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
