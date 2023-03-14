import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import "../../styles/coachProfile.css";
import { ProfileSidebar } from "../userComponents/profileSidebar.jsx";
import { capitalize } from "../userComponents/profileInfo.jsx";
// import { func } from "prop-types";
import { useParams } from "react-router-dom";

export const CoachPublic = () => {
  const { store, actions } = useContext(Context);
  const { getPublicProfile } = actions
  let { coach_id } = useParams();


  //Function to populate form with data
  useEffect(() => {
    async function fetchData() {
      getPublicProfile(coach_id);
    }
    fetchData()
  }, []);

  useEffect(() => {
    setData()
  }, [store["publicCoachInfo"]]);

  let user = store["publicCoachInfo"]
  async function setData() {
    if (store["publicCoachInfo"]) {
      document.getElementById("profilePic").src = user.profile_picture
      document.getElementById("publicViewUserFullName").innerText = capitalize(user.first_name) + " " + capitalize(user.last_name)
      document.getElementById("publicViewUserBio").innerText = capitalize(user.bio)
      console.log(store.publicCoachInfo)
    }
  }

  return (
    <>
      <div className="d-flex">
        <ProfileSidebar navTitle="Coach" className="sidebar-coach" />
        {/* Main Container */}
        <div className="container-fluid px-0 main-container">
          <div className="d-flex flex-column">
            <div id="profileBanner" className="profile-coach_banner" ></div>
            {/* START Coach Profile Section  */}
            <section className="profile-coach-section" style={{ backgroundColor: "RGB(28, 28, 26)" }}>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <img id="profilePic" src="" className="profile-pic_coach" alt="" />
                </div>
                <h1 className="px-3 pb-3 border-bottom text-white titles-font" id="publicViewUserFullName"></h1>
              </div>
              <div className="d-flex flex-column align-items-center ">
                {user?.bio === "" ? "" : <h1 className="text-white titles-font"> About Me </h1>}
                <p id="publicViewUserBio" className="w-50 text-white"></p>
              </div>
            </section>
            {/* END Coach Profile Section */}
            {/* Start of statistics */}
            <div className="mt-5 mb-5">
              <div className="features-container-section mx-5 ">
                <div className="row">
                  <div className="col-md-4 col-lg-4 features-container-items ">

                    <h2 className="features-heading-text display-6">Review Rating</h2>
                    <p className="features-text display-2">
                      {user?.rating}
                    </p>
                  </div>
                  <div className="col-md-4 col-lg-4 features-container-items">
                    <h2 className="features-heading-text display-6">Workouts</h2>
                    <p className="features-text display-2">
                      {user?.workouts}
                    </p>
                  </div>
                  <div className="col-md-4 col-lg-4 features-container-items">
                    <h2 className="features-heading-text display-6">Users</h2>
                    <p className="features-text display-2">
                      {user?.users}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* END of statistics SECTION */}

            {/* REVIEW SECTION */}
            <section style={{ color: "#000", backgroundColor: "#e67e22" }}>
              <div className="container py-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-10 col-xl-8 text-center">
                    <h3 className="fw-bold mb-4 text-white titles-font">Reviews</h3>
                    <p className="mb-4 pb-2 mb-md-5 pb-md-0 text-white">
                      Looking for feedback on our fitness program? Check out our reviews! Our satisfied customers have shared their experiences and results, giving you a glimpse of what you can achieve with our program. Don't just take our word for it, see what others have to say and join our community today!.
                    </p>
                  </div>
                </div>

                <div className="container row text-center">
                  <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-stretch">
                    <div className="card border-0 ">
                      <div className="card-body py-4 mt-2 card-coach-profile" >
                        <div className="d-flex justify-content-center mb-4">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                            className="rounded-circle shadow-1-strong" width="100" height="100" />
                        </div>
                        <h5 className="font-weight-bold titles-font">John Appleseed</h5>
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
                  <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-stretch">
                    <div className="card border-0">
                      <div className="card-body py-4 mt-2 card-coach-profile">
                        <div className="d-flex justify-content-center mb-4">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                            className="rounded-circle shadow-1-strong" width="100" height="100" />
                        </div>
                        <h5 className="font-weight-bold titles-font">Maggie Potter</h5>
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
                  <div className="col-md-4 mb-0 d-flex align-items-stretch">
                    <div className="card border-0">
                      <div className="card-body py-4 mt-2 card-coach-profile">
                        <div className="d-flex justify-content-center mb-4">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                            className="rounded-circle shadow-1-strong" width="100" height="100" />
                        </div>
                        <h5 className="font-weight-bold titles-font">Otto Muntz</h5>
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
      </div>
    </>
  );
};
