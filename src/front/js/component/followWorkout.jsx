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

    const [weekFilter,setWeekFilter]=useState(1)
    const [dayFilter,setDayFilter]=useState(1)
    const [weeksLib,setWeeksLib]=useState([])
    const [exerciseList,setExerciseList]=useState()
    const [selectedExercise,setSelectedExercise]=useState(0)
    const [user,setUser]=useState()

    const [showExerciseDescription,setShowExerciseDescription]=useState(false)
    const [showAdditional,setShowAdditional]=useState(false)

    useEffect(() => {
        if(program_id){
            async function test(){
                await getFullWorkout(program_id)
                setUser(store["workoutInstructions"])
            }
            test()
        }
    }, []);

    useEffect(()=>{
        if(user){
            setWeeksLib([...Array(user.weeks).keys()].slice(1).map(elem=>({label:`Week ${elem} of ${user.weeks}`,value:elem})))
            setExerciseList(user.exercises.filter(e=>e.day===dayFilter && e.week===weekFilter))
            console.log(user.exercises)
        }
    },[user])

    function changeDay(day){
        setDayFilter(day)
        setSelectedExercise(0)
    }
    
    useEffect(()=>{
        if(user){
            setExerciseList(user.exercises.filter(e=>e.day===dayFilter && e.week===weekFilter))
        }
    },[weekFilter,dayFilter])

    useEffect(()=>{
        if(exerciseList)setSelectedExercise(exerciseList.indexOf(exerciseList.find(e=>e.completed==false)))
    },[exerciseList])

    return( 
        <div className="container" style={{margin:"2%", minWidth:"96%", height:"100vh"}}>
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
            <hr className="mt-0 "/>
            <div className="row w-100" style={{margin:"0px"}}>
                <div className="col-md-6">
                    <div className="card mb-4 mb-xl-0">
                        {exerciseList&&exerciseList.length?exerciseList[selectedExercise]?<div className="card-body">
                            <video src={exerciseList[selectedExercise]["exercise video"]} autoPlay muted loop controls width="100%" ></video>
                            <h5 className="card-title">{exerciseList[selectedExercise].name}</h5>
                            <h6 className="card-subtitle mb-2 d-flex justify-content-between">
                                Exercise description:
                                <div onClick={()=>setShowExerciseDescription(!showExerciseDescription)}>
                                    <i className={`fa-solid fa-${showExerciseDescription?"minus":"plus"}`}></i>
                                </div>
                            </h6>
                            <hr className="mb-1 mt-0"/>
                            {showExerciseDescription?<div>
                                <p className="mb-1">{exerciseList[selectedExercise]["exercise description"]} </p>
                                <hr className="mb-1 mt-0"/>
                            </div>:""
                            }
                            <h6 className="card-subtitle mb-2 mt-2 d-flex justify-content-between">
                                Additional information:
                                <div onClick={()=>setShowAdditional(!showAdditional)}>
                                    <i className={`fa-solid fa-${showAdditional?"minus":"plus"}`}></i>
                                </div>
                            </h6>
                            <hr className="mb-1 mt-0"/>
                            {showAdditional?<div>
                                <p className="mb-1">{exerciseList[selectedExercise]["additional info"]} </p>
                                <hr className="mb-1 mt-0"/>
                            </div>:""
                            }
                        </div>
                        :"":""}
                        
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="row m-1 mt-3 p-0">
                            <div className="col-xl-4">
                                <Select
                                    id="inputExercise"
                                    value={weeksLib[weekFilter-1]}
                                    options={weeksLib}
                                    onChange={(e)=>setWeekFilter(e.value)}
                                />
                            </div>
                            <div className="col-xl-8">
                                <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor:"white", padding:"0"}}>
                                    <ul className="navbar-nav w-100 d-flex justify-content-end" id="selectedWorkoutExecuteExerciseFilter">
                                        {[...Array(user?.days_per_week).keys()].slice(1).map((elem,idx)=>{
                                        return(
                                            <li className={`nav-item ${idx==dayFilter-1?"active":""}`}
                                            key={idx} style={{paddingRight:"2%",paddingLeft:"2%"}}
                                            onClick={()=>changeDay(idx+1)}
                                            >
                                                <a className={`nav-link ${idx==dayFilter-1?"active":""}`} href="#" style={{fontSize:".95rem"}}>Day {elem}</a>
                                            </li>
                                        )})}
                                    </ul>
                                </nav>
                            </div>
                            <hr className="mt-3 mb-0"/>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {exerciseList?exerciseList.map((exercise,idx)=>{
                                    return(
                                        <li className={`d-flex justify-content-between list-group-item ${idx===selectedExercise?"bg-light":""}`} 
                                        onClick={()=>setSelectedExercise(idx)}
                                        key={idx}
                                        >
                                            {exercise.name}
                                            <div>
                                                {exercise.completed?<i className="fa-solid fa-check text-success"></i>:""}
                                            </div>
                                        </li>
                                    )
                                }):""}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}