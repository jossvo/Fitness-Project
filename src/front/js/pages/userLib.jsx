import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";

export const UserLibrary = ({ navTitle = "User" }) => {
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
        hi
    </div>
  );
};