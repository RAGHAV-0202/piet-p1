import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard.jsx";
import Error from "./Pages/error.jsx";
import Claim from "./Pages/claim.jsx";
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claim" element={<Claim/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
