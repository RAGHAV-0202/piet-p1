import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard.jsx";
import Error from "./Pages/error.jsx";
import Claim from "./Pages/claim.jsx";
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import Submissions from "./Pages/mySubmissions.jsx";
import Profile from "./Pages/profile.jsx";
import AdminSubmissions from "./Pages/adminSubmissions.jsx";
import AdminDashboard from "./Pages/adminDashboard.jsx";
import AdminLogin from "./Pages/adminLogin.jsx";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claim" element={<Claim/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/submissions" element={<Submissions/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Error />} />

        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/submissions" element={<AdminSubmissions />} />
      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
