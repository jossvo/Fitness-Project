import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { UserPublic } from "./userComponents/userPublic.jsx";
import { ProfileInfo } from "./userComponents/profileInfo.jsx";
import { ProfileSecurity } from "./userComponents/profileSecurity.jsx";
import { Workouts } from "./pages/workouts";
import { ExecuteWorkout } from "./component/followWorkout.jsx";
import { Faqs } from "./pages/faqs";

import { CoachInfo } from "./coachComponents/coach_Info.jsx";
import { CoachPublic } from "./coachComponents/coach_profile_info.jsx";
import { CoachSecurity } from "./coachComponents/coach_security.jsx";
import { CreateProgram } from "./coachComponents/coach_create_program.jsx";

import { MyPlans } from "./pages/myPlans.jsx";

import { CoachesLibrary } from "./pages/coaches";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { components } from "react-select";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            {/* User routes */}
            <Route element={<UserPublic />} path="/user/:userid" />
            <Route element={<ProfileInfo />} path="/settings/profile" />
            <Route element={<UserPublic />} path="/settings/billing" />
            <Route element={<ProfileSecurity />} path="/settings/security" />
            {/* Coach routes */}
            <Route element={<CoachPublic />} path="/coach/settings/profile_view" />
            <Route element={<CoachInfo />} path="/coach/settings/profile" />
            <Route
              element={<CoachSecurity />}
              path="/coach/settings/security"
            />
            <Route
              element={<CreateProgram />}
              path="/coach/settings/new_program"
            />
            <Route
              element={<CreateProgram />}
              path="/coach/settings/edit_program/:program_id"
            />

            <Route element={<Workouts />} path="/programs" />
            <Route element={<MyPlans />} path="/my_programs" />
            <Route element={<ExecuteWorkout />} path="/my_programs/:program_id" />
            <Route element={<CoachesLibrary />} path="/coaches" />
            <Route element={<Faqs />} path="/faqs" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
