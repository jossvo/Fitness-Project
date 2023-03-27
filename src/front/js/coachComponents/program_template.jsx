import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate , useParams } from "react-router-dom";
import Select from "react-select";

import "../../styles/coachStyle.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProgramTemplate = () => {
  const navigate = useNavigate();
  let { program_id } = useParams();

  const { store, actions } = useContext(Context);
  const {setNewElement,getDetails,getList ,updateWorkout,updateExercise,updateExerciseOrder,deleteExerciseAssigned} = actions;

  const [exercise, setExercise] = useState();
  const [userID, setUserID] = useState();
  const [UserAssignHelp,setUserAssignHelp] = useState("")
  const [workoutWeeks,setWorkoutWeeks] = useState(15);
  const [workoutDays,setWorkoutDays] = useState(7);
  const [workoutImage,setWorkoutImage]=useState("https://picsum.photos/seed/picsum/200/200")

  const [weekFilter, setWeekFilter]=useState(1)
  const [dayFilter, setDayFilter]=useState(1)
  const [updateList,setUpdateList]=useState()
  const [isPublicState, setIsPublicState] = useState(true);
  const [disableList, setDisableList] = useState(false);

  const [show, setShow] = useState(false);
  const [fetchMessage,setFetchMessage] = useState('Loading, please wait');

  let workout = ""
  useEffect(() => {
    async function fetchData(){
      let resp = await getDetails('workouts',program_id);
      if (resp=='unauthorized')navigate('/')
      getList('exercise_library')
      getList('user_library')
    }
    if(program_id)fetchData()
    else {
      document.getElementById("createWorkoutForm").reset()
      setWorkoutImage("https://picsum.photos/seed/picsum/200/200")
    }
  },[program_id]);

  // useEffect to update exercise library and get all assigned exercises
  useEffect(() => {
    async function fetchData(){
      getList('exercise_library')
      getList(`exercise_assigned/${program_id}`,'exerciseAssigned')
    }
    if(program_id)fetchData()
  },[updateList]);

  // useEffect and function to populate form with fetch data
  useEffect(() => {
    setData()
  },[store["workoutsDetail"]]);

  async function setData(){
    if(store["workoutsDetail"]&&program_id){
      workout = store["workoutsDetail"]
      setWorkoutImage(workout.wk_image)
      document.getElementById("inputWorkoutName").value=workout.name
      setWorkoutWeeks(workout.weeks)
      setWorkoutDays(workout.days_per_week)
      document.getElementById("inputWorkoutDifficulty").value=workout.difficulty
      document.getElementById("inputWorkoutDescription").value=workout.description
      document.getElementById("inputWorkoutType").value=workout.isPublic
    }
  }

  function handleSelectUserChange(e) {
    if(e!==null){
        setUserID(e.value)
        setUserAssignHelp("")
    }
    else{
        setUserID(e)
        setUserAssignHelp("Workout must be assigned to user if private")
    }
  }
  function handleOtherExerciseCheckbox(e) {
    if (e.target.checked)setDisableList(true)
    else setDisableList(false);
  }
  function workoutTypeChange(e){
    e.target.value==="false"?setIsPublicState(false)
    :setIsPublicState(true)
    if(!isPublicState)setUserAssignHelp("")
  }
  function filteredExerciseOrderList(){
    let filteredArr = []
    if(store.exerciseAssigned){
      filteredArr=[...store.exerciseAssigned]
      filteredArr = filteredArr.filter(elem=>elem.week===weekFilter)
      filteredArr = filteredArr.filter(elem=>elem.day===dayFilter)
      filteredArr = filteredArr.sort((e1, e2) => 
      (e1.order > e2.order) ? 1 
      : (e1.order < e2.order) ? -1 : 0
      )
    }
    return filteredArr
  }
  //New exercise Div
  function allowNewExercise() {
    if (disableList) {
      return (
        <div className="newExerciseCreateWorkoutDiv row">
          <div className="row gx-3 mb-3">
            <div className="col-md-7">
              <label className="form-label" htmlFor="inputNewExercise">
                New Exercise Name
              </label>
              <input
                required
                className="form-control"
                id="inputNewExercise"
                type="text"
                placeholder="Enter your first name"
                name="new_exercise"
              />
            </div>

            <div className="col-md-5">
              <label className="form-label" htmlFor="inputNewExerciseVideo">
                New Exercise Video
              </label>
              <input
                className="form-control"
                type="file"
                accept="video/mp4,video/x-m4v,video/*"
                name="new_exercise_video"
                id="inputNewExerciseVideo"
              />
            </div>
          </div>

          <div className="row gx-3 mb-3">
            <div className="col-md-12">
              <label
                htmlFor="inputNewExerciseDescription"
                className="form-label"
              >
                New Exercise Description
              </label>
              <textarea
                className="form-control"
                id="inputNewExerciseDescription"
                name="new_exercise_description"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      );
    }
  }


  // Upload/update workout data from Workout Details form
  async function updateData(e) {
    e.preventDefault();
    if(!isPublicState && !userID){
        setUserAssignHelp("Workout must be assigned to user if private")
        return false
    }
    const data = new FormData(e.target);
    data.set('is_public',data.get('type'))
    if(userID)data.set('user_id',userID)
    if(data.get('file').size===0 || data.get('file').name==='')data.delete('file')

    if(!program_id){
      let response = await setNewElement('workouts',data)
      if(response ==="error"){
        alert("Something went wrong! Please try again")
      }else {
        navigate(`/coach/settings/edit_program/${response}`)
      }
      return false
    }
    let response = await updateWorkout(data,program_id)
    if(response !="ok"){
      alert("Something went wrong! Please try again")
      return false
    }
  }

  // Upload/update exercise data from Exercise Assign Details form
  async function updateExerciseAssign(e){
    e.preventDefault();
    setShow(true)
    setFetchMessage('Please wait while we upload this')
    const data = new FormData(e.target);
    let newExerciseData = new FormData()
    let exerciseAssignedID=""
    //If need to first upload new exercise
    
    if(data.get('new_exercise')!=""&&!exercise){
      newExerciseData.set('name',data.get('new_exercise'))
      newExerciseData.set('description',data.get('new_exercise_description'))
      newExerciseData.set('file',data.get('new_exercise_video'))

      let response = await setNewElement('exercise',newExerciseData)
      if(response ==="error"){
        setFetchMessage("Exercise couldn't be created: Something went wrong! Please try again")
        setTimeout(setShow(false), 4000)
        return false
      }
      exerciseAssignedID=response
    }
    //If exercise from available exercises list
    if(exerciseAssignedID==="")exerciseAssignedID=exercise.value
    data.set('workout_id',program_id)
    data.set('order',filteredExerciseOrderList().length+1)
    data.set('week',weekFilter)
    data.set('day',dayFilter)
    data.set('exercise_id',exerciseAssignedID)

    let newResponse = await setNewElement('assign_exercise',data)
    if(newResponse ==="error"){
      setFetchMessage("Exercise couldn't be assigned: Something went wrong! Please try again")
      setTimeout(setShow(false), 4000)
      return false
    }else{
      document.getElementById("exerciseAssignForm").reset();
      setExercise(null)
      setUpdateList(true)
      setDisableList(false)
    }
    setFetchMessage("Information successfully changed!")
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }

  // Upload/update exercise data from Exercise Assign Details form
  async function updateExerciseOrderFunction(exerciseID,newOrder){
    let data = new FormData()
    let old_exercise = filteredExerciseOrderList()[newOrder].id
    //Form data and 'PATCH' method for first item
    data.set('new_exercise',exerciseID)
    data.set('old_exercise',old_exercise)

    let response = await updateExerciseOrder(data)
    if(response !="ok"){
      alert("Something went wrong! Please try again")
      return false
    }
  }

  return (
      <div
        className="container"
        style={{ width: "90%", marginTop: "5vh", minHeight: "90vh"}}
      >
        <div
          className="row"
          style={{ marginBottom: "calc(var(--bs-gutter-x))" }}
        >
          <div className="col-xl-12">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Workout Details</div>
              <form id="createWorkoutForm" onSubmit={updateData}>
                <div
                    className="row gx-3 mb-3 workoutDetailsDiv"
                    style={{ paddingLeft: "calc(var(--bs-gutter-x) * .5)" }}
                >
                    <div
                    id="workoutImage"
                    className="col-md-4 card-body  "
                    style={{
                        backgroundImage:`url(${workoutImage})`,
                        backgroundSize:"cover",
                        borderRight: "2px",
                        borderColor: "black",
                        }}
                    >
                      <div className="d-flex align-items-end h-100">
                        <div className="d-flex flex-column p-2 rounded" style={{backgroundColor:"white"}}>
                          <label className="form-label" htmlFor="inputWorkoutImage">
                            Workout Image
                          </label>
                          <input
                              required={program_id?false:true}
                              name="file"
                              className="form-control form-control-sm"
                              accept="image/png, image/jpeg"
                              id="inputWorkoutImage"
                              type="file"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8" style={{paddingLeft:"0px"}}>
                        <div className="card-body">
                            <div className="row gx-3 mb-3">
                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="inputWorkoutName">
                                    Workout Name
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        id="inputWorkoutName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        name="name"
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="inputWorkoutWeeks">
                                        Weeks
                                    </label>
                                    <select
                                        name="weeks"
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={workoutWeeks}
                                        onChange={e=>setWorkoutWeeks(e.target.value)}
                                        id="inputWorkoutWeeks"
                                    >
                                        {[...Array(16).keys()].slice(1).map((week,index) =>{
                                            return(
                                                <option value={week} key={index}>{week}</option>
                                            )}
                                        )}
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="inputWorkoutDays">
                                        Days/Week
                                    </label>
                                    <select
                                        name="days_per_week"
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={workoutDays}
                                        onChange={e=>setWorkoutDays(e.target.value)}
                                        id="inputWorkoutDays"
                                    >
                                        {[...Array(8).keys()].slice(1).map((day,index) =>{
                                            return <option value={day} key={index}>{day}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="inputWorkoutDifficulty">
                                        Difficulty
                                    </label>
                                    <select
                                        name="difficulty"
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="inputWorkoutDifficulty"
                                    >
                                        {["easy","medium","hard"].map((difficulty,index)=>{
                                            return <option value={difficulty} key={index}>{difficulty}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3" style={{ position: "relative" }}>
                                    <label className="form-label" htmlFor="inputWorkoutType">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="inputWorkoutType"
                                        onChange={workoutTypeChange}
                                    >
                                        {[{type:"public",value:true},{type:"private",value:false}].map((elem,index)=>{
                                            return <option value={elem.value} key={index}>{elem.type}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="inputUserToAssign">
                                        User To Assign Workout
                                    </label>
                                    <Select
                                        isClearable={true}
                                        placeholder="Select user..."
                                        id="inputUserToAssign"
                                        options={store["user_library"]}
                                        onChange={handleSelectUserChange}
                                        isDisabled={isPublicState}
                                    />
                                    <div id="UserAssignHelp" className="form-text" style={{color:"red"}} >
                                        {UserAssignHelp}                    
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="inputWorkoutDescription" >Workout Description</label>
                                    <textarea className="form-control" id="inputWorkoutDescription" rows="3" name="description" required></textarea>
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">
                                {program_id?"Update Workout":"Create Workout"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        
        {program_id?<div>
          <div className="row gx-3 mb-3">
            <div className="col-xl-12">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Select parameters to edit:</div>
                <div className="card-body">
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="inputExerciseAsssignOrderWeek">
                        Select Week
                      </label>
                      <select
                        name="week"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e)=>setWeekFilter(parseInt(e.target.value))}
                        id="inputExerciseAsssignOrderWeek"
                      >
                        {[...Array(workoutWeeks+1).keys()].slice(1).map((week,index) =>{
                            return <option value={week} key={index}>{week}</option>
                        })}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="inputExerciseAsssignOrderDay">
                        Select Day
                      </label>
                      <select
                        name="week"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e)=>setDayFilter(parseInt(e.target.value))}
                        id="inputExerciseAsssignOrderDay"
                      >
                        {[...Array(workoutWeeks+1).keys()].slice(1).map((week,index) =>{
                            return <option value={week} key={index}>{week}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-xl-4 ">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Exercise order</div>
                <ul className="list-group overflow-auto">
                  {filteredExerciseOrderList().map((elem,index)=>{
                    return( 
                      <li className="exerciseOrderLiDiv" key={index} >
                        <div>
                          <span className="deleteExerciseAssignSpan align-self-center" onClick={()=>deleteExerciseAssigned(elem.id)} >
                            <i className="fa fa-trash"></i>
                          </span>
                          <div className="exerciseAssignOrderLiData d-flex justify-content-between">
                            <div className="align-self-center">
                              <h6 className="m-0">{elem.name}</h6>
                              <p className="m-0"> {elem.sets}x{elem.reps} | rest: {elem.rest} sec</p>
                            </div>
                            <div className="d-flex flex-column exerciseOrderDiv align-self-center"> 
                              <i className={index===0?"fa fa-caret-up arrowDisabled":"fa fa-caret-up"}
                                onClick={()=>{index===0?"":updateExerciseOrderFunction(elem.id,index-1)}}>
                              </i>
                              <i className={index===filteredExerciseOrderList().length-1?
                                "fa fa-caret-down arrowDisabled":"fa fa-caret-down"} 
                                onClick={()=>{index===filteredExerciseOrderList().length-1?"":updateExerciseOrderFunction(elem.id,index+1)}}></i>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
  
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Exercise Details</div>
                <div className="card-body">
                  <form id="exerciseAssignForm" onSubmit={updateExerciseAssign}>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-10">
                        <label className="form-label" htmlFor="inputExercise">
                          Exercise Library
                        </label>
                        <Select
                          isClearable={true}
                          placeholder="Select exercise..."
                          value={exercise}
                          id="inputExercise"
                          options={store["exercise_library"]}
                          onChange={setExercise}
                          isDisabled={disableList}
                        />
                      </div>
                      <div className="col-md-2 d-flex align-items-end">
                        <div
                          className="form-check"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            onChange={handleOtherExerciseCheckbox}
                          />
                          <label
                            className="form-label"
                            htmlFor="flexCheckChecked"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                      <div id="exerciseAssignHelp" className="form-text" style={{color:"red"}}> 
                      {!disableList && !exercise?"Favor de asignar ejercicio":""}         
                      </div>
                    </div>
                    {/* Section visible if want to create a new exercise */}
                    {allowNewExercise()}
  
                    <div className="row gx-3 mb-3">
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="inputExerciseAssignSets">
                          Sets
                        </label>
                        <input
                            required
                            className="form-control"
                            id="inputExerciseAssignSets"
                            type="number" min="0" step="1"
                            placeholder="0"
                            style={{height:"48%"}}
                            name="sets"
                        />
                      </div>
  
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="inputExerciseAssignReps">
                          Repetitions
                        </label>
                        <input
                            required
                            className="form-control"
                            id="inputExerciseAssignReps"
                            type="number" min="0" step="1"
                            placeholder="0"
                            style={{height:"48%"}}
                            name="reps"
                        />
                      </div>
  
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="inputExerciseAssignRest">
                          Rest between sets (in sec)
                        </label>
                        <input
                            required
                            className="form-control"
                            id="inputExerciseAssignRest"
                            type="number" min="0" step="1"
                            placeholder="0"
                            style={{height:"48%"}}
                            name="rest_between_sets"
                        />
                      </div>
                    </div>
  
                    <div className="row gx-3 mb-3">
                        <div className="col-md-12">
                            <label className="form-label" htmlFor="inputExerciseAssignDescription" >Additional Exercise Description</label>
                            <textarea className="form-control" id="inputExerciseAssignDescription" rows="2" name="description"></textarea>
                        </div>
                    </div>
  
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">
                          Assign Exercise
                        </button>
                    </div>
                    <div data-keyboard="false" data-backdrop="static">
                      <Modal id="workoutModal" show={show} data-backdrop="static" data-keyboard="false">
                        <div className="spinner-container w-100 d-flex justify-content-center">
                          <div className="loading-spinner">
                          </div>
                        </div>
                        <Modal.Body>{fetchMessage}</Modal.Body>
                      </Modal>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        :""}
      </div>
  );
};
