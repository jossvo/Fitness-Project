import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";

export const ProfileInfo = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);
  const changeInputValue =event=>{
    event.target.value
  }
  //Function to populate form with data
  useEffect(() => {
    document.getElementById("inputUsername").value="jossvo"
    document.getElementById("inputFirstName").value="Josue"
    document.getElementById("inputLastName").value="Vilchis"
    document.getElementById("inputEmailAddress").value="jossvo26@outlook.com"
    document.getElementById("inputGender").value = "Male"
    // if ( sharegender = "yes"): get ID of Radio = True else the other
    document.getElementById("radioGenderFalse").checked = true
    document.getElementById("inputBirthday").value = "1997-06-17"
    document.getElementById("radioAgeFalse").checked = true
    document.getElementById("inputHeight").value = "170"
    document.getElementById("radioHeightFalse").checked = true
    document.getElementById("inputWeight").value = "80"
    document.getElementById("radioWeightFalse").checked = true
  },[]);

  return (
    <div
      style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar />
      <div
        className="container overflow-auto"
        style={{ height: "95vh", width: "90%", marginTop: "5vh" }}
      >
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>

                <button className="btn btn-primary" type="button">
                  Upload profile picture
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {[
                    { title: "Gender", share: "Gender", type: "text" },
                    { title: "Birthday", share: "Age", type: "date" },
                  ].map((elem, index) => {

                    //Map for Gender and Birthday
                    let radioID1 = "radio" + elem.share + "True";
                    let radioID2 = "radio" + elem.share + "False";
                    let radioName = "inputRadio" + elem.share;

                    return (
                      <div className="row gx-3 mb-3 d-flex" key={index}>
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputPhone">
                            {elem.title}
                          </label>
                          <input
                            className="form-control"
                            id={"input"+elem.title}
                            type={elem.type}
                            placeholder={
                              "Enter your " + elem.share.toLowerCase()
                            }
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor={elem.share + "container"}>
                            Share {elem.share}
                          </label>
                          <div
                            className="d-flex w-100"
                            id={elem.share + "container"}
                          >

                            <div className="w-50">
                              <input
                                name={radioName}
                                id={radioID1}
                                type="radio"
                              />
                              <label className="small mb-1 radioLabel" htmlFor={radioName}>
                                Yes
                              </label>
                            </div>

                            <div className="w-50">
                              <input
                                name={radioName}
                                id={radioID2}
                                type="radio"
                              />
                              <label className="small mb-1 radioLabel" htmlFor={radioName}>
                                No
                              </label>
                            </div>
    
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="d-flex">
                    {["Height","Weight"].map((elem,index)=>{
                        return(
                            <div className="row gx-3 mb-3 d-flex" key={index}>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor={"input"+elem}>
                                        {elem} ({index==0?"cm":"kg"})
                                    </label>
                                    <input
                                        className="form-control"
                                        id={"input"+elem}
                                        type="text"
                                        placeholder={"Enter "+elem.toLocaleLowerCase()}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor={"radio"+elem+"container"}>
                                        Share {elem}
                                    </label>
                                    <div className="d-flex align-items-center h-50" name={"radio"+elem+"container"}>
                                        <div className="w-50">
                                            <input
                                                name={"radio"+elem}
                                                id={"radio"+elem+"True"}
                                                type="radio"
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"radio"+elem}>
                                                Yes
                                            </label>
                                        </div>
                                        <div className="w-50">
                                            <input
                                                name={"radio"+elem}
                                                id={"radio"+elem+"False"}
                                                type="radio"
                                            />
                                            <label className="small mb-1 radioLabel" htmlFor={"radio"+elem}>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})
                    }  
                  </div>

                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
