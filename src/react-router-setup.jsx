import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
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
import AdminManageUsers from "./Pages/adminManageUsers.jsx";
import AdminBackups from "./Pages/adminBackups.jsx";
import ResetRequest from "./Pages/reset-password-request.jsx";
import ResetPassword from "./Pages/reset-password.jsx";

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
        <Route path="/reset-request" element={<ResetRequest/>}/>
        <Route path="/c03ef05e65659d2a75944d3d72eb71f4f94c6f9b/:token" element={<ResetPassword/>}/>


        <Route path="*" element={<Error />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
        <Route path="/admin/users" element={<AdminManageUsers />} />
        <Route path="/admin/backups" element={<AdminBackups />} />

      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
