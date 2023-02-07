//Imports y UseEffect para hacer el fecth de los datos para la libreria de entrenamientos ("Workouts")
import React,{ useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";

export const Navbar = () => {
	//Sección para descargar los datos
	const { store, actions } = useContext(Context);
	useEffect(() => {
		async function fetchData(){
		  actions.getList("workouts");
		}
		fetchData()
	  },[]);
	
	// console.log(store["workouts"])

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
