import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../userComponents/profileInfo.jsx";
import Select from "react-select";
import "../../styles/coachStyle.css";

export const ExecuteWorkout = () => {
  const { store, actions } = useContext(Context);
  const { getFullWorkout, updateExerciseStatus, deleteExerciseStatus } = actions;
  let { program_id } = useParams();
  const navigate = useNavigate()

  const [weekFilter, setWeekFilter] = useState(1);
  const [dayFilter, setDayFilter] = useState(1);
  const [weeksLib, setWeeksLib] = useState([]);
  const [exerciseList, setExerciseList] = useState();
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [user, setUser] = useState();

  const [showExerciseDescription, setShowExerciseDescription] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [setCounter, setSetCounter] = useState(0);

  useEffect(() => {
    if (program_id) {
      async function fetchData() {
        let resp = await getFullWorkout(program_id);
        // if(resp == undefined) navigate('/')
        // else setUser(store["workoutInstructions"]);
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setWeeksLib(
        [...Array(user.weeks).keys()].slice(1).map((elem) => ({
          label: `Week ${elem} of ${user.weeks}`,
          value: elem,
        }))
      );
      setExerciseList(
        user.exercises.filter(
          (e) => e.day === dayFilter && e.week === weekFilter
        )
      );
    }
  }, [user]);

  function changeDay(day) {
    setDayFilter(day);
    setSelectedExercise(0);
  }

  useEffect(() => {
    if (user) {
      setExerciseList(
        user.exercises.filter(
          (e) => e.day === dayFilter && e.week === weekFilter
        )
      );
    }
  }, [weekFilter, dayFilter]);

  useEffect(()=>{
    setSetCounter(0)
  },[weekFilter,dayFilter,selectedExercise,user])
  useEffect(()=>{
    setUser(store["workoutInstructions"])
  },[store["workoutInstructions"]])

  useEffect(() => {
    if (exerciseList){
      let exercise_idx=exerciseList.indexOf(exerciseList.find((e) => e.completed == false))
      if(exercise_idx==-1)setSelectedExercise(0)
      else setSelectedExercise(
        exerciseList.indexOf(exerciseList.find((e) => e.completed == false))
      );
    }
  }, [exerciseList]);

  let timer;
  useEffect(() => {
    if (startTimer) {
      let restTime = exerciseList[selectedExercise]["rest"];
      let minuteCounter = Math.floor(restTime / 60);
      let secondCounter = restTime - (minuteCounter * 60);
      setMinutes(minuteCounter)
      setSeconds(secondCounter)
      timer = setInterval(() => {
        if (secondCounter == 1 && minuteCounter == 0) {
          setSeconds(0)
          setSetCounter(setCounter+1)
          setStartTimer(false)
          clearInterval(timer);
          if(setCounter+1===exerciseList[selectedExercise]["sets"])ifCompleted()
        }else if(secondCounter == 0 && minuteCounter > 0) {
          minuteCounter -= 1
          setMinutes(minuteCounter);
          secondCounter=59
          setSeconds(secondCounter);
        }else{
          secondCounter -= 1
          setSeconds(secondCounter);
        }
      }, 1000);
    }
  }, [startTimer]);

  async function ifCompleted(){
    let response = await updateExerciseStatus(exerciseList[selectedExercise]["id"])
    if (response != 'ok'){alert('Something went wrong! Please select Finish exercise button.')}
  }
  async function restartExercise(){
    let response = await deleteExerciseStatus(exerciseList[selectedExercise]["id"])
    if (response != 'ok'){alert('Something went wrong! Please resend the request.')}
  }

  return (
    <div
      className="container"
      style={{ margin: "2%", minWidth: "96%", height: "100vh" }}
    >
      <div className="row w-100 m-auto mb-4">
        <div className="col-sm-3">
          <img
            src={user ? user.wk_image : "..."}
            className="img-fluid"
            alt="Responsive image"
          />
        </div>
        <div className="col-sm-9 container d-flex flex-column">
          <h1 style={{ fontWeight: "lighter" }}>{user ? user.name : ""}</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "lighter" }}>
            {user
              ? user.weeks +
                " Weeks / " +
                user.days_per_week +
                " Days per Week / " +
                capitalize(user.difficulty)
              : ""}
          </p>
          <h4>Workout Summary</h4>
          <p>{user ? user.description : ""}</p>
        </div>
      </div>
      <hr className="mt-0 " />
      <div className="row w-100" style={{ margin: "0px" }}>
        <div className="col-md-6">
          <div className="card mb-4 mb-xl-0">
            {exerciseList && exerciseList.length ? (
              exerciseList[selectedExercise] ? (
                <div className="card-body">
                  <video
                    src={exerciseList[selectedExercise]["exercise video"]}
                    autoPlay
                    muted
                    loop
                    controls
                    width="100%"
                  ></video>
                  <h5 className="card-title">
                    {exerciseList[selectedExercise].name}
                  </h5>
                  <h6 className="card-subtitle mb-2 d-flex justify-content-between">
                    Exercise description:
                    <div
                      onClick={() =>
                        setShowExerciseDescription(!showExerciseDescription)
                      }
                    >
                      <i
                        className={`fa-solid fa-${
                          showExerciseDescription ? "minus" : "plus"
                        }`}
                      ></i>
                    </div>
                  </h6>
                  <hr className="mb-1 mt-0" />
                  {showExerciseDescription ? (
                    <div>
                      <p className="mb-1">
                        {exerciseList[selectedExercise]["exercise description"]}{" "}
                      </p>
                      <hr className="mb-1 mt-0" />
                    </div>
                  ) : (
                    ""
                  )}
                  <h6 className="card-subtitle mb-2 mt-2 d-flex justify-content-between">
                    Additional information:
                    <div onClick={() => setShowAdditional(!showAdditional)}>
                      <i
                        className={`fa-solid fa-${
                          showAdditional ? "minus" : "plus"
                        }`}
                      ></i>
                    </div>
                  </h6>
                  <hr className="mb-1 mt-0" />
                  {showAdditional ? (
                    <div>
                      <p className="mb-1">
                        {exerciseList[selectedExercise]["additional info"]}
                      </p>
                      <hr className="mb-1 mt-0" />
                    </div>
                  ) : (
                    ""
                  )}
                  {exerciseList[selectedExercise]['completed']==false?(
                    <div>
                      <h1
                        className="d-flex justify-content-end"
                        style={{ fontSize: "1.5rem" }}
                      >
                        Sets:
                        <div className="ms-2">
                          {[
                            ...Array(exerciseList[selectedExercise]["sets"]).keys(),
                          ].map((elem, idx) => {
                            return (
                              <i
                                className="fa-solid fa-dumbbell me-2"
                                key={idx}
                                style={{
                                  fontSize: "1.2rem",
                                  color: `${idx < setCounter ? "black" : "lightgray"}`,
                                }}
                              ></i>
                            );
                          })}
                        </div>
                      </h1>
                      <h1 style={{ fontSize: "1.5rem" }}>Rest Time:</h1>
                      <h1 style={{ textAlign: "center", fontSize: "3.5rem" }}>
                        {minutes < 10 ? "0" + minutes : minutes}:
                        {seconds < 10 ? "0" + seconds : seconds}
                      </h1>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            !startTimer?setStartTimer(true):""
                          }}
                        >
                          Start Timer
                        </button>
                        <button type="button" className="btn btn-danger" onClick={ifCompleted}>
                          Finish exercise
                        </button>
                      </div>
                    </div>
                  ):(
                    <div className="d-flex justify-content-end mt-3">
                      <button type="button" className="btn btn-danger" onClick={()=>restartExercise()}>
                        Restart exercise
                      </button>
                    </div>
                  )
                  }
                  
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="row m-1 mt-3 p-0">
              <div className="col-xl-4">
                <Select
                  id="inputExercise"
                  value={weeksLib[weekFilter - 1]}
                  options={weeksLib}
                  onChange={(e) => setWeekFilter(e.value)}
                />
              </div>
              <div className="col-xl-8">
                <nav
                  className="navbar navbar-expand-sm navbar-light"
                  style={{ backgroundColor: "white", padding: "0" }}
                >
                  <ul
                    className="navbar-nav w-100 d-flex justify-content-end"
                    id="selectedWorkoutExecuteExerciseFilter"
                  >
                    {[].concat([...Array(user?.days_per_week).keys()],'')
                      .slice(1)
                      .map((elem, idx) => {
                        return (
                          <li
                            className={`nav-item ${
                              idx == dayFilter - 1 ? "active" : ""
                            }`}
                            key={idx}
                            style={{ paddingRight: "2%", paddingLeft: "2%" }}
                            onClick={() => changeDay(idx + 1)}
                          >
                            <a
                              className={`nav-link ${
                                idx == dayFilter - 1 ? "active" : ""
                              }`}
                              href="#"
                              style={{ fontSize: ".95rem" }}
                            >
                              Day {idx+1}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </nav>
              </div>
              <hr className="mt-3 mb-0" />
            </div>
            <div className="card-body">
              <ul className="list-group">
                {exerciseList
                  ? exerciseList.map((exercise, idx) => {
                      return (
                        <li
                          className={`d-flex justify-content-between list-group-item ${
                            idx === selectedExercise ? "bg-light" : ""
                          }`}
                          onClick={() => setSelectedExercise(idx)}
                          key={idx}
                        >
                          {exercise.name}
                          <div>
                            {exercise.completed ? (
                              <i className="fa-solid fa-check text-success"></i>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
