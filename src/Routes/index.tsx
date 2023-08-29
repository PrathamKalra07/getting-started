import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//
import App from "../App";
import PageNotFound404 from "../Views/PageNotFound404/PageNotFound404";
import DemoPage from "../Views/Demo";
import ViewFinalPdf from "../Views/ViewFinalPdf";
import InPersonSigningPage from "../Views/InPersonSigning";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/viewFinalPdf" Component={ViewFinalPdf} />
        <Route path="/demo" Component={DemoPage} />
        <Route path="/in-person-signing" Component={InPersonSigningPage} />
        <Route path="/page404" Component={PageNotFound404} />
      </Routes>
    </Router>
  );
};

export { AllRoutes };
