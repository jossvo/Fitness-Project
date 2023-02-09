import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <React.Fragment>
      <div
        className="p-5 text-center bg-image row"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          height: 700,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <div className="d-flex justify-content-left align-items-center h-100">
            <div className="text-white text-container col-sm-9 col-md-6 col-lg-6 col-xl-3 ">
              <h3>Get the best Routine</h3>
              <h1 className="mb-3 hero-text">Are you a hard worker?</h1>
              <h3>
                Fit Central is the best fitness program to reach your goal{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section*/}
      {/* Start Features Section*/}
      <div className="container-fluid mt-5 mb-5">
        <div className="features-container-section mx-5 ">
          <h2 className="text-center features-h1 titles ">
            All features are included with your plan
          </h2>
          <h3 className="text-center features-h2">
            Evidence-based approach to dieting and training
          </h3>
          <div className="row">
            <div className="col-md-6 col-lg-3 features-container-items ">
              <i className="fa-solid fa-dumbbell main-icon-1"></i>
              <h2 className="features-heading-text">Routines</h2>
              <p className="features-text">
                Donec sed odio dui. Etiam porta sem malesuada magna mollis
                euismod. Nullam id dolor id.{" "}
              </p>
            </div>
            <div className="col-md-6 col-lg-3 features-container-items">
              <i className="fa-regular fa-calendar main-icon-2"></i>
              <h2 className="features-heading-text">Tracking</h2>
              <p className="features-text">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit.{" "}
              </p>
            </div>
            <div className="col-md-6 col-lg-3 features-container-items">
              <i className="fa-solid fa-child-reaching main-icon-1"></i>
              <h2 className="features-heading-text">Activity</h2>
              <p className="features-text">
                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam.{" "}
              </p>
            </div>
            <div className="col-md-6 col-lg-3 features-container-items">
              <i className="fa-solid fa-mobile-screen-button main-icon-2"></i>
              <h2 className="features-heading-text">Web Mobile</h2>
              <p className="features-text">
                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Features Section*/}
      <div className="join-container bg-dark row">
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <h4 className="text-white w-50 ">Traning Journey's</h4>
            <h2 className="text-white w-50">A training Journey for every goal</h2>
            <p className="text-white w-50">
            Your Coach analyzes your fitness an goals, paving your individual
            path to success
          </p>1
            <div className="btn-container w-50">
              <button className="btn btn-light inline-block mt-3">Learn about traning</button>
              <button className="btn btn-warning inline-block mt-3 ">Join Now</button>
            </div>
        </div>
        <div className="col-12 col-lg-6">
          <img
            src="https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="d-block mx-lg-auto img-fluid"
          
          />
        </div>
      </div>
      {/* End Features Section*/}
        <div className="container px-4 py-5" id="custom-cards">
    <h2 className="pb-2 border-bottom">Choose your favorite routine</h2>
      

    <div className="row row-cols-1 h-100 row-cols-lg-3 align-items-stretch g-4 py-5 ">
      <div className="col">
        <div className="card card-cover overflow-hidden text-bg-dark shadow-lg" style={{ 
      backgroundImage: `url("https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      backgroundRepeat:"no-repeat", 
      backgroundSize:"cover",
      backgroundPosition: "center",
      height: '35vh',
      borderRadius: 8,  
    }} >
          <div className="d-flex flex-column p-5 pb-3 text-white">
            <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold routines-titles ">Yoga and AcroYoga</h3>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card card-cover overflow-hidden text-bg-dark shadow-lg" style={{ 
      backgroundImage: `url("https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` , 
      backgroundRepeat:"no-repeat", 
      backgroundSize:"cover", 
      backgroundPosition: "center",
      height: '35vh',
      borderRadius: 8,
    }} >
          <div className="d-flex flex-column h-100  p-5 pb-3 text-white text-shadow-1">
            <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold routines-titles">The best routines for ABS</h3>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card card-cover  overflow-hidden text-white shadow-lg" style={{ 
      backgroundImage: `url("https://images.pexels.com/photos/1032117/pexels-photo-1032117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      backgroundRepeat:"no-repeat", 
      backgroundSize:"cover", 
      backgroundPosition: "center",
      height: '35vh',
      borderRadius: 8,    




}}>
          <div className="d-flex flex-column  p-5 pb-3 text-shadow-1">
            <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold routines-titles">Routines to gain muscles </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
      {/* End Cards Plans Section*/}
    </React.Fragment>
  );
};
