import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//
import App from "../App";
import PageNotFound404 from "../Views/PageNotFound404/PageNotFound404";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/page404" Component={PageNotFound404} />
      </Routes>
    </Router>
  );
};

export { AllRoutes };
