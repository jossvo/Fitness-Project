import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom"
import Select from "react-select";
import { ProfileSidebar } from "../userComponents/profileSidebar.jsx";
import "../../styles/coachStyle.css";


export const CreateProgram = () => {
  const { store, actions } = useContext(Context);
  const { updateAccountDetails , updateImage, setProfileImage} = actions
  const [exercise,setExercise] = useState()
  const [disableList,setDisableList]=useState(false)

  let exercises = [
    {label:"ejercicio 1",value:"1"},
    {label:"ejercicio 2",value:"2"},
    {label:"ejercicio 3",value:"3"},
  ]
  function handleSelectExerciseChange({value}){
    setExercise(value)
  }
  function handleOtherExerciseCheckbox(e){
    if(e.target.checked){
      setDisableList(true)
    }else setDisableList(false)
  }

  // Update profile data from Account Details form
  async function updateData(e){
    e.preventDefault()
    const data = new FormData(e.target);
    data.set('share_gender',data.get("inputRadioGender"))
    data.set('share_age',data.get("inputRadioAge"))

    let resp = await updateAccountDetails(data)
    if(resp !="ok"){

    }else window.location.reload(true)
  }
  async function updateProfilePicture(e){
    e.preventDefault()
    const data = new FormData(e.target);
    let resp = await updateImage(data)
    if (resp)window.location.reload(true)
  }

  return (
    <div className="profileDiv"
      style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar navTitle="Coach"/>
      <div
        className="container overflow-auto"
        style={{ height: "95vh", width: "90%", marginTop: "5vh" }}
      >
        <div className="row" style={{marginBottom:"calc(var(--bs-gutter-x))"}}>
          <div className="col-xl-12">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Workout Details</div>
              <div className="row gx-3 mb-3 workoutDetailsDiv" style={{paddingLeft:"calc(var(--bs-gutter-x) * .5)"}}>
                <div className="col-md-4" style={{backgroundColor:"rgba(0,0,0,.03)", borderRight:"2px",borderColor:"black"}}>
                  <form onSubmit={updateProfilePicture}>
                    <div className="card-body text-center">
                      <img
                        id="profileImg"
                        className="img-account-profile rounded-circle mb-2"
                        src=""
                        alt="profile picture"
                      />

                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 5 MB
                      </div>

                      <div className="mb-3" >
                        <input
                        required 
                        name="file"
                        className="form-control form-control-sm" 
                        accept="image/png, image/jpeg" 
                        id="inputProfileImg" 
                        type="file" 
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Exercise order</div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Exercise Details</div>
              <div className="card-body">
                <form onSubmit={updateData}>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-10">
                      <label className="small mb-1" htmlFor="inputExercise">
                        Exercise Library
                      </label>
                      <Select
                        placeholder="Select exercise..."
                        id="inputExercise"
                        options={exercises}
                        onChange={handleSelectExerciseChange}
                        isDisabled={disableList}
                      />
                    </div>
                    <div className="col-md-2" style={{position: "relative"}}>
                      <div className="form-check" style={{position: "absolute", top: "40%"}}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={handleOtherExerciseCheckbox}/>
                        <label className="small mb-1" htmlFor="flexCheckChecked">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-2">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Week
                      </label>
                      <select
                          name="gender"
                          className="form-select"
                          aria-label="Default select example"
                          id = "inputGender"
                        >
                        <option defaultValue disabled>
                          Choose One
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Day
                      </label>
                      <select
                          name="gender"
                          className="form-select"
                          aria-label="Default select example"
                          id = "inputGender"
                        >
                        <option defaultValue disabled>
                          Choose One
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Order
                      </label>
                      <select
                          name="gender"
                          className="form-select"
                          aria-label="Default select example"
                          id = "inputGender"
                        >
                        <option defaultValue disabled>
                          Choose One
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        required
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        name="first_name"
                      />
                      <div id="FirstNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        required
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        name="last_name"
                      />
                      <div id="LastNameHelp" className="form-text" style={{color:"red"}}>                    
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
