import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/userStyle.css";


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
    if(user)console.log(user["exercises"][0]["exercise video"])

    return( 
        <div>
            <div style={{width:"10%"}}>
                <video src={user?user["exercises"][0]["exercise video"]:""} controls width="420" >
                    Your browser does not support the video tag.
                </video>
            </div>  
        </div>
    )
}