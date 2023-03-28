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
  { }
  const { store, actions } = useContext(Context);
  const { setWorkoutUser } = actions
  const [searchName, setSearchName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedWeeks, setSelectedWeeks] = useState("");

  let type='user'
  if(localStorage.type!='u')type = 'coach'

  useEffect(() => {
    async function fetchData() {
      actions.getList("workouts");
      if(type==='user'){
        actions.getList(`${type}/my_programs_id`,'myProgramsID')
      }
    }
    fetchData();
  }, []);

  const inputSearch = (event) => {
    setSearchName(event.target.value);
  };
  function getWorkouts(){
    if(!store.workouts)return[]
    let output = [...store.workouts]
    if(searchName){
      output=output.filter((element) => element.name.toLowerCase().includes(searchName.toLowerCase()) || element.coach_name.toLowerCase().includes(searchName.toLowerCase()))
    }

    if(selectedDifficulty){
      output = output.filter((element) =>  element.difficulty === selectedDifficulty)
    }
    if(selectedWeeks){
      let weeksArr = []
      switch(selectedWeeks){
        case "1":
          weeksArr=[1,2,3,4]
          break;
        case "2":
          weeksArr=[5,6,7,8,9]
          break;
        case "3":
          weeksArr=[10,11,12,13,14,15]
          break;
      }
  
      output=output.filter((element) => weeksArr.includes(element.weeks)===true)
    }
    return output
  }

  const inputDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const inputWeeks = (event) => {
    setSelectedWeeks(event.target.value);
  };

  async function reactWorkoutButton(wk_id){
    let resp = await setWorkoutUser(wk_id)
    if(resp != "ok")alert('Something went wrong, please try again.')
  }

  return (
    <>
      <div className="workout-main-container">
        <div>
          {/* Aca empieza el Sidebar */}
          <CDBSidebar
            toggled={false}
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
                    <div className="form-check">
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
                        htmlFor="exampleRadios2"
                      >
                        Hard
                      </label>
                    </div>
                  </div>
                </CDBSidebarMenuItem>

              </CDBSidebarMenu>
              <CDBSidebarMenuItem icon="calendar">
                Filter by Weeks
              </CDBSidebarMenuItem>

              <CDBSidebarMenuItem className="mx-5 my-2">
                <div>
                  <div className="form-check mt-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weeks"
                      id="four"
                      value="1"
                      onChange={inputWeeks}
                    />
                    <label className="form-check-label" htmlFor="exampleRadios1">1-4</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weeks"
                      id="six"
                      value="2"
                      onChange={inputWeeks}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      5-9
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weeks"
                      id="eight"
                      value="3"
                      onChange={inputWeeks}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      10+
                    </label>
                  </div>
                  
                </div>
              </CDBSidebarMenuItem>
            </CDBSidebarContent>

            <CDBSidebarFooter
              style={{ textAlign: "center" }}
            ></CDBSidebarFooter>
          </CDBSidebar>
          {/* Aca Finaliza el Sidebar */}
        </div>
        <div className="d-flex-column w-100 justify-content-center">
          <h1 className="page-title text-center my-4 page-title-coachLib w-100">
            Workout Library
          </h1>

          <div className="container-fluid overflow-auto">
            <div className="row ">
              {getWorkouts().map((element, index) => (
                <div
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3 d-flex align-items-stretch "
                  key={element.id || index}
                >
                  <div className="card">
                    <h5 className="card-title-section text-center title-container">
                      {element.name}
                    </h5>
                    <ul className="list-group list-group-flush list-group-workouts ">
                      <li>
                        <img
                          className="card-img-top"
                          src={element.wk_image}
                          alt="Workout Image"
                        />
                      </li>
                      <li className="list-group-item workout-item bg-light card-text ">
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
                    {type==='user' && store["myProgramsID"]?<div className="my-3 h-100 d-flex align-items-end">
                        <Link
                          to={store["myProgramsID"].includes(element.id)?`/my_programs/${element.id}`:""}
                          className={`btn ${store["myProgramsID"].includes(element.id)?"btn-primary":"btn-warning"} btn-workout-library`}
                          onClick={()=>store["myProgramsID"].includes(element.id)?"":reactWorkoutButton(element.id)}
                        >
                          {store["myProgramsID"].includes(element.id)?"Open":"Buy"}
                        </Link>
                      </div>:""}
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
