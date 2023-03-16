import React, { useState, useEffect, useContext } from "react";
import "../../styles/coachLibrary.css";
export const CoachesLibrary = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card bg-dark" style={{ borderRadius: "15px" }}>
                <div className="">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src="https://images.pexels.com/photos/6456290/pexels-photo-6456290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Coach"
                        className="h-100 img-fluid img-coach-card"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3 p-3">
                      <h5 className="mb-1 text-light">Coach Name</h5>
                      <div
                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div>
                          <p className="small text-muted mb-1">Workouts</p>
                          <p className="mb-0">41</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Users</p>
                          <p className="mb-0">976</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Rating</p>
                          <p className="mb-0">8.5</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <button
                          type="button"
                          className="btn btn-warning flex-grow-1"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
