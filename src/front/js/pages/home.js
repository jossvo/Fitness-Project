import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div
        className="p-5 text-center bg-image"
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
            <div className="text-white text-container">
              <h3>Get the best Routine</h3>
              <h1 className="mb-3 hero-text">Are you a hard worker?</h1>
              <h3>Fit Central is the best fitness program to reach your goal </h3>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section*/}
      {/* Start Features Section*/}
      <div className="container-fluid">
        <div className="features-container-section">
          <h2 className="text-center features-h1">All features are included with your plan</h2>
          <h3 className="text-center features-h2">Evidence-based approach to dieting and training</h3>
          <div className="row mx-5 px-5">
            <div className="col-lg-3 features-container-items">
              <i class="fa-solid fa-dumbbell main-icon-1"></i>
              <h2 className="features-heading-text">Routines</h2>
              <p className="features-text">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id. </p>

            </div>
            <div className="col-lg-3 features-container-items">
              <i class="fa-regular fa-calendar main-icon-2"></i>
              <h2 className="features-heading-text">Tracking</h2>
              <p className="features-text">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.  </p>

            </div>
            <div className="col-lg-3 features-container-items">
              <i class="fa-solid fa-child-reaching main-icon-1"></i>
              <h2 className="features-heading-text">Activity</h2>
              <p className="features-text">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. </p>

            </div>
            <div className="col-lg-3 features-container-items">
              <i class="fa-solid fa-mobile-screen-button main-icon-2"></i>
              <h2 className="features-heading-text">Web Mobile</h2>
              <p className="features-text">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. </p>

            </div>
          </div>
        </div>

      </div>
      {/* End Features Section*/}
    </div>
  );
};
