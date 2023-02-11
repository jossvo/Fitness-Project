import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { element } from "prop-types";

export const UserLibrary = () => {
  const { store, actions } = useContext(Context);

  //Function to populate form with data
  useEffect(() => {
    async function fetchData(){
      actions.getList("workouts");
		}
		fetchData()
  },[]);

  console.log(store["workouts"])

  return (
    <div>
    <h1 className="page-title">My Plans</h1>
      <div className="container">
        <div className="row">
          {store.workouts?map((element) => (
            <div key={element.uid} className="col-3">
              <div className="card">
                <h5 className="card-title-section text-center">{element.name}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><span>Days per week:</span>{element.days_per_week}</li>
                  <li className="list-group-item"><span>Description:</span>{element.description}</li>
                  <li className="list-group-item"><span>Exercise Count:</span>{element.exercise_count}</li>
                  <li className="list-group-item"><span>Days per week:</span>{element.days_per_week}</li>
                  <li className="list-group-item"><span>Days per week:</span>{element.days_per_week}</li>
                  <li className="list-group-item"><span>Days per week:</span>{element.days_per_week}</li>
                </ul>
                {/* <link to="#" className="btn btn-warning">
                  Start Now
                </link> */}
              </div>
            </div>
          ))}
        </div>  
      </div>
      </div>
      );
};
