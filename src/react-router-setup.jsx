import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard.jsx";
import Error from "./Pages/error.jsx";
import Claim from "./Pages/claim.jsx";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claim" element={<Claim/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
