import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/userStyle.css";
import { ProfileSidebar } from "./profileSidebar.jsx";

export const ProfileSecurity = ({ navTitle = "User" }) => {
  const { store, actions } = useContext(Context);

  return (
    <div style={{ backgroundColor: "#e3e6e6", display: "flex", height: "100vh" }}
    >
      <ProfileSidebar />
      <div className="container overflow-auto" style={{height:"95vh", width:"90%",marginTop:"5vh"}}>
        <div className="row">
            <div className="col-lg-8">
                
                <div className="card mb-4">
                    <div className="card-header">Change Password</div>
                    <div className="card-body">
                        <form>
                            
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                                <input className="form-control" id="currentPassword" type="password" placeholder="Enter current password"/>
                            </div>
                            
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="newPassword">New Password</label>
                                <input className="form-control" id="newPassword" type="password" placeholder="Enter new password"/>
                            </div>
                            
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="confirmPassword">Confirm Password</label>
                                <input className="form-control" id="confirmPassword" type="password" placeholder="Confirm new password"/>
                            </div>
                            <button className="btn btn-primary" type="button">Save</button>
                        </form>
                    </div>
                </div>                
            </div>
            
            <div className="col-lg-4">
                
                <div className="card mb-4">
                    <div className="card-header">Delete Account</div>
                    <div className="card-body">
                        <p>Deleting your account is a permanent action and cannot be undone. If you are sure you want to delete your account, select the button below.</p>
                        <button className="btn btn-danger-soft text-danger" type="button">I understand, delete my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};
