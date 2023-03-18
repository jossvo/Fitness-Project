import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { capitalize } from "../userComponents/profileInfo.jsx";
import Select from "react-select";
import "../../styles/coachStyle.css";


export const ExecuteWorkout = () => {
    const { store, actions } = useContext(Context);
    const { getFullWorkout } = actions
    let { program_id } = useParams();
    
    useEffect(() => {
        async function fetchData() {
            getFullWorkout(program_id)
        }
        fetchData();
      }, []);

    let user = store["workoutInstructions"]
    let weeksLib = []
    if(user){
        console.log(store["workoutInstructions"])
        weeksLib = [...Array(user.weeks).keys()].slice(1).map(elem=>({label:`Week ${elem} of ${user.weeks}`,value:elem}))
    }
    // options={user?[...Array(user.exercise.length()+1).keys()].map(elem=>({label:`Week ${elem} of ${user.exercise.length()+1}`,value:elem})):""}
//     <div>
//     <div style={{width:"10%"}}>
//         <video src={user?user["exercises"][0]["exercise video"]:""} autoPlay muted loop controls width="420" >
//             Your browser does not support the video tag.
//         </video>
//     </div>  
// </div>
    return( 
        <div className="container" style={{margin:"2%", minWidth:"96%"}}>
            <div className="row w-100 m-auto mb-4" >
                <div className="col-sm-3">
                    <img src={user?user.wk_image:"..."} className="img-fluid" alt="Responsive image"/>
                </div>
                <div className="col-sm-9 container d-flex flex-column">
                    <h1 style={{fontWeight:"lighter"}}>{user?user.name:""}</h1>
                    <p style={{fontSize:"1.5rem",fontWeight:"lighter"}}>{user?user.weeks +" Weeks / " + user.days_per_week +" Days per Week / " + capitalize(user.difficulty) :""}</p>
                    <h4>Workout Summary</h4>
                    <p>{user?user.description:""}</p>
                </div>
            </div>
            <hr className="mt-0 mb-"/>
            <div className="row w-100" style={{margin:"0px"}}>
                <div className="col-md-6">
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-body text-center">
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="row m-1 mt-3 p-0">
                            <div className="col-xl-4">
                                <Select
                                    id="inputExercise"
                                    value={weeksLib[0]}
                                    options={weeksLib}
                                />
                            </div>
                            <div className="col-xl-8">
                                <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor:"white"}}>
                                    <ul className="navbar-nav w-100 d-flex justify-content-end" id="selectedWorkoutExecuteExerciseFilter">
                                        {[...Array(user?.days_per_week).keys()].slice(1).map((elem,idx)=>{
                                        return(
                                            <li className={`nav-item ${idx==0?"active":""}`} key={idx} style={{paddingRight:"2%",paddingLeft:"2%"}}>Day {elem}</li>
                                        )})}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}