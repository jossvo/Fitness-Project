import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/coachLibrary.css";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarSubMenu,
  CDBSidebarFooter,
} from "cdbreact";

export const CoachesLibrary = () => {
  const { store, actions } = useContext(Context);
  const { getList } = actions;
  const [coachInfo, setCoachInfo] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [originalCoachInfo, setOriginalCoachInfo] = useState([]);

  //Function to populate form with data
  useEffect(() => {
    async function test() {
      await getList("coaches", "coachesDir");
      console.log(store["coachesDir"]);
      setCoachInfo(store["coachesDir"]);
      setOriginalCoachInfo(store["coachesDir"]);
    }
    test();
  }, []);

  const handleSearch = () => {
    const filteredCoaches = coachInfo.filter(
      (coach) =>
        coach &&
        `${coach.first_name} ${coach.last_name}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
    );
    setCoachInfo(filteredCoaches);
  };

  const handleClear = () => {
    setSearchName("");
    setCoachInfo(originalCoachInfo);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className=""  >
        <div className="h-100 d-flex" style={{minHeight:"100vh"}}>
          <div>
            <CDBSidebar toggled="false" style={{ backgroundColor: "#333" }}>
              <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                Filter
              </CDBSidebarHeader>
              <CDBSidebarContent>
                <CDBSidebarMenu>
                  <CDBSidebarMenuItem icon="search">
                    Search By Name
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                    <button className="button-clear" onClick={handleClear}>
                      <i className="fa-solid fa-eraser"></i>
                    </button>
                  </CDBSidebarMenuItem>
                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: "center" }}>
                <div
                  className="sidebar-btn-wrapper"
                  style={{ padding: "20px 5px" }}
                ></div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>

          <div className="row d-flex align-items-center h-100">
            <h1 className="p-5 text-center page-title-coachLib w-100">
              {" "}
              Coach Library
            </h1>
            {coachInfo.map(
              (coach, index) =>
                coach && (
                  <div key={index} className="col-sm-2 col-md-6 col-lg-6">
                    <div
                      className="card m-2 bg-dark"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <img
                              src={coach.profile_picture}
                              alt="Coach"
                              className="h-100 img-fluid img-coach-card"
                              style={{ width: "180px", borderRadius: "10px" }}
                            />
                          </div>
                          <div className="flex-grow-1 ms-3 p-4">
                            <h5 className="mb-1 text-white">
                              {coach.first_name} {coach.last_name}
                            </h5>
                            <p className="text-light">
                              Username: {coach.username}
                            </p>
                            <div
                              className="d-flex justify-content-start rounded-3 p-2 mb-2"
                              style={{ backgroundColor: "#efefef" }}
                            >
                              <div>
                                <p className="small text-muted mb-1">
                                  Workouts
                                </p>
                                <p className="mb-0">{coach.workouts}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">Users</p>
                                <p className="mb-0">{coach.users}</p>
                              </div>
                              <div>
                                <p className="small text-muted mb-1">Rating</p>
                                <p className="mb-0">{coach.rating}</p>
                              </div>
                            </div>
                            <div className="d-flex pt-1">
                              <button
                                type="button"
                                className="btn btn-warning flex-grow-1"
                              >
                                <Link
                                  to={`/coach/${coach.id}`}
                                  className="btn btn-warning"
                                >
                                  View Coach Details
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
