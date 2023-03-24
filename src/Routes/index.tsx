import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//
import App from "../App";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
      </Routes>
    </Router>
  );
};

export { AllRoutes };
