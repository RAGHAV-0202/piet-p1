import React from "react";
// import Navbar from "../Components/navbar.jsx";
// import axios from "axios";
// import SideBar from "../Components/sidebar.jsx";
import AdminNavbar from "../Components/adminNavbar.jsx";
import "../CSS/responsive.css"
import AdminSideBar from "../Components/adminSidebar.jsx";


const Options = () => {
    return (
        <div className="actions w-full flex flex-wrap gap-10 p-10 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl">
            {[
                { href: "/admin/submissions", icon: "fa-folder", text: "ALL Submissions" },
                { href: "/admin/users", icon: "fa-user", text: "ALL Users" }
            ].map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="w-[220px] h-[200px] shadow-lg bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col rounded-2xl group hover:scale-[1.08] transition-all duration-300 ease-in-out transform hover:shadow-2xl"
                >
                    <div className="flex-1 flex items-center justify-center text-gray-800 text-opacity-90">
                        <i className={`fa-regular ${item.icon} text-6xl`}></i>
                    </div>
                    <p className="h-[50px] bg-yellow-400 text-white flex justify-center items-center gap-2 text-lg font-semibold rounded-b-2xl">
                        <i className="fa-solid fa-star"></i>
                        {item.text}
                    </p>
                </a>
            ))}
        </div>
    );
};
const AdminDashboard = () => {
    return(
        <div className="dashboard_main_div h-auto min-h-screen w-screen flex flex-row">
            <AdminSideBar/>
            <div className="dashboard_content w-[80%] flex flex-col flex-1">
                <AdminNavbar/>
                <div className="dashboard_areaContent bg-[#EDEFFD] flex w-full min-h-[calc(100vh-80px)] h-auto rounded-2xl mt-5 shadow-2xs flex-col p-5 md:p-10">
                    {/* No gap between these elements */}
                    {/* <UserWelcome/> */}
                    <Options/>
                </div> 
            </div>
        </div>
    )
}

export default AdminDashboard ; 