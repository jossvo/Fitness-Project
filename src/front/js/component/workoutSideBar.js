import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

export const SideBar = () => {
  return (
    <CDBSidebar
      toggled="false"
      textColor="#333"
      backgroundColor="#f0f0f0"
      className="workout-sidebar-title"
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars " />}>
        Find Your Workout
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="search">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note">
            Filter by difficult
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem className="mx-5 my-2">
            {" "}
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="exampleRadios1">
                  Easy
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="option2"
                />
                <label class="form-check-label" for="exampleRadios2">
                  Medium
                </label>
              </div>
              <div class="form-check disabled">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios3"
                  value="option3"
                />
                <label class="form-check-label" for="exampleRadios3">
                  Hard
                </label>
              </div>
            </div>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
    </CDBSidebar>
  );
};
