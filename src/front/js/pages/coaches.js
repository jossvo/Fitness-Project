import React, { useState, useEffect } from "react";
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
  const [coachInfo, setCoachInfo] = useState([]);
  const [searchName, setSearchName] = useState("");

  const getCoachDetails = async (coach_id) => {
    const apiUrl =
      "https://3001-jossvo-fitnessproyect-o0zi8gz6uvt.ws-us90.gitpod.io";
    const resp = await fetch(apiUrl + `/coachpublicinfo/${coach_id}`);
    if (!resp.ok) {
      return false;
    } else {
      let data = await resp.json();
      return data;
    }
  };

  useEffect(() => {
    const coachIds = [5, 6, 7]; // Importante corregir esto tomando el dato de los ID disponibles
    Promise.all(coachIds.map((id) => getCoachDetails(id)))
      .then((data) => setCoachInfo(data.filter((coach) => coach))) // Checkear esto
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = () => {
    const filteredCoaches = coachInfo.filter(
      (coach) =>
        coach &&
        coach.first_name.toLowerCase().includes(searchName.toLowerCase())
    );
    setCoachInfo(filteredCoaches);
  };

  const getInitialCoachData = async () => {
  const coachIds = [5, 6, 7];
  const data = await Promise.all(coachIds.map((id) => getCoachDetails(id)))
    .then((data) => data.filter((coach) => coach))
    .catch((error) => console.log(error));
  setCoachInfo(data);
};

useEffect(() => {
  getInitialCoachData();
}, []);

  return (
    <>
      <div className="">
        <div className="h-100 d-flex">
          <div>
            <CDBSidebar toggled="false">
              <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                Filter
              </CDBSidebarHeader>
              <CDBSidebarContent>
                <CDBSidebarMenu>
                  <CDBSidebarMenuItem icon="search">
                    Filter By Name
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>
                    <button className="btn btn-warning mx-3" onClick={handleSearch}>
                      Search
                    </button>
                    <button className="btn btn-light " onClick={getInitialCoachData}>
                      Clear
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
            <h1 className="text-center p-5"> Coach Library</h1>
            {coachInfo.map(
              (coach, index) =>
                coach && ( //Corregir
                  <div
                    key={index}
                    className="col-2 col-sm-12 col-md-6 col-lg-6"
                  >
                    <div
                      className="card m-2 bg-dark"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <img
                              src="https://images.pexels.com/photos/4164844/pexels-photo-4164844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                                View Profile
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
