import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import "../../styles/coachProfile.css";
import { ProfileSidebar } from "../userComponents/profileSidebar.jsx";
import { capitalize } from "../userComponents/profileInfo.jsx";
import { func } from "prop-types";

export const CoachPublic = () => {
  const { store, actions } = useContext(Context);

  //Function to populate form with data
  useEffect(() => {
    async function fetchData() {
      actions.getProfile();
    }
    fetchData()
  }, []);

  useEffect(() => {
    setData()
  }, [store["userinfo"]]);

  let user = store["userinfo"]
  async function setData() {
    if (store["userinfo"]) {
      document.getElementById("profilePic").src = user.profile_picture
      document.getElementById("publicViewUserFullName").innerText = capitalize(user.first_name) + " " + capitalize(user.last_name)
      document.getElementById("publicViewUserBio").innerText = capitalize(user.bio)
    }
  }

  return (
    <>
      {/* Main Container */}
      <div className="container-fluid px-0 main-container">
        {/* <ProfileSidebar navTitle="Coach" /> */}
        <div className="d-flex flex-column">
          <div id="profileBanner" className="profile-coach_banner" ></div>
          {/* START Coach Profile Section  */}
          <section className="profile-coach-section">
            <div className="d-flex justify-content-center align-items-center">
              <div className="profile-pic_coach d-flex ">
                <img id="profilePic" src="" className="profile-pic_coach" alt="" />
              </div>
              <h1 className="px-3 pb-3 border-bottom" id="publicViewUserFullName"></h1>
            </div>
            <div className="d-flex flex-column align-items-center">
              {user?.bio === "" ? "" : <h1> About Me </h1>}
              <p id="publicViewUserBio" className="w-50"></p>
            </div>
          </section>
          {/* END Coach Profile Section */}
          {/* Start of statistics */}
          <section className="d-flex justify-content-center align-items-center pb-5 statistics-section">
            <div className="d-flex flex-column align-items-center">
              <h5 className="text-center">No. of Reviews</h5>
              <div className="circle-statistics-section d-flex align-items-center justify-content-center">
                <h3 className="text-white text-center">6</h3>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h5 className="text-center">No. of Sales</h5>
              <div className="circle-statistics-section d-flex align-items-center justify-content-center">
                <h3 className="text-white text-center">10</h3>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h5 className="text-center">No. of Workouts</h5>
              <div className="circle-statistics-section d-flex align-items-center justify-content-center">
                <h3 className="text-white text-center">3</h3>
              </div>
            </div>

          </section>
          {/* END of statistics SECTION */}

          {/* REVIEW SECTION */}
          <section style={{ color: "#000", backgroundColor: "#e1b12c" }}>
            <div className="container py-5">
              <div className="row d-flex justify-content-center">
                <div className="col-md-10 col-xl-8 text-center">
                  <h3 className="fw-bold mb-4 text-white">Reviews</h3>
                  <p className="mb-4 pb-2 mb-md-5 pb-md-0 text-white">
                    Looking for feedback on our fitness program? Check out our reviews! Our satisfied customers have shared their experiences and results, giving you a glimpse of what you can achieve with our program. Don't just take our word for it, see what others have to say and join our community today!.
                  </p>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="card">
                    <div className="card-body py-4 mt-2">
                      <div className="d-flex justify-content-center mb-4">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                          className="rounded-circle shadow-1-strong" width="100" height="100" />
                      </div>
                      <h5 className="font-weight-bold">John Appleseed</h5>
                      <h6 className="font-weight-bold my-3">The Best Workout Program I've Tried!</h6>
                      <ul className="list-unstyled d-flex justify-content-center">
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star-half-alt fa-sm text-info"></i>
                        </li>
                      </ul>
                      <p className="mb-2">
                        <i className="fas fa-quote-left pe-2"></i>I never thought working out could be so enjoyable until I tried this fitness program. It's helped me lose weight and gain strength, all while having fun.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="card">
                    <div className="card-body py-4 mt-2">
                      <div className="d-flex justify-content-center mb-4">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                          className="rounded-circle shadow-1-strong" width="100" height="100" />
                      </div>
                      <h5 className="font-weight-bold">Maggie Potter</h5>
                      <h6 className="font-weight-bold my-3">Transform Your Body with This Fitness Program</h6>
                      <ul className="list-unstyled d-flex justify-content-center">
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                      </ul>
                      <p className="mb-2">
                        <i className="fas fa-quote-left pe-2"></i>I love how personalized this program is! The trainers really take the time to understand my fitness goals and create workouts that challenge me but are still doable.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-0">
                  <div className="card">
                    <div className="card-body py-4 mt-2">
                      <div className="d-flex justify-content-center mb-4">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                          className="rounded-circle shadow-1-strong" width="100" height="100" />
                      </div>
                      <h5 className="font-weight-bold">Otto Muntz</h5>
                      <h6 className="font-weight-bold my-3">Highly Effective and Easy to Follow</h6>
                      <ul className="list-unstyled d-flex justify-content-center">
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-sm text-info"></i>
                        </li>
                        <li>
                          <i className="far fa-star fa-sm text-info"></i>
                        </li>
                      </ul>
                      <p className="mb-2">
                        <i className="fas fa-quote-left pe-2"></i>I've tried a lot of different fitness programs over the years, but this one is by far my favorite. The community of other people working toward their fitness goals has been a huge motivator for me, and the results speak for themselves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* END OF REVIEW SECTION */}
        </div>
      </div>
    </>
  );
};
