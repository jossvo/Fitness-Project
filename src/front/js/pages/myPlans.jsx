import React,{useContext,useEffect, useState}from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';

export const MyPlans = () => {
    const { store, actions } = useContext(Context);
    const { getList } = actions
    let navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem("accessToken"))navigate("/")
    },[])

    let type='user'
    if(store.type!='u')type = 'coach'
    useEffect(() => {
        async function fetchData() {
            let resp = await getList(`${type}/my_programs`,'myPrograms')
        }
        fetchData();
    }, []);
  return (
    <div className="d-flex-column w-100 justify-content-center" style={{minHeight:'100vh'}}>
        <h1 className="page-title text-center my-4 page-title-workoutLib w-100">
        My Programs
        </h1>

        <div className="container-fluid overflow-auto">
        <div className="row ">
            {store['myPrograms']?.map((element, index) => (
            <div
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3 d-flex align-items-stretch"
                key={element.id || index}
            >
                <div className="card">
                    <h5 className="card-title-section text-center title-container">
                        {element.name}
                    </h5>
                    <ul className="list-group list-group-flush list-group-workouts">
                        <li>
                        <img
                            className="card-img-top"
                            src={element.wk_image}
                            alt="Workout Image"
                        />
                        </li>
                        <li className="list-group-item workout-item card-text bg-light ">
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
                    <div className="my-3 card-footer d-flex justify-items-end">
                        <Link
                            to={type=='coach'?`/coach/settings/edit_program/${element.id}`:`/my_programs/${element.id}`}
                            className="btn btn-warning btn-workout-library align-self-end"
                        >
                            {type=='user'?"Open":"Edit"}
                        </Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  )
}
