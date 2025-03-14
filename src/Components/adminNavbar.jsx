import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../baseurl.js";
import { useNavigate } from "react-router-dom";
import "../CSS/responsive.css";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullName: "Name", 
        profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg", 
        designation: "Professor"
    });
    
    useEffect(() => {
        const getUser = async() => {
            try {
                const response = await axios.get(`${baseUrl}api/admin/loggedin`, { withCredentials: true }, { withCredentials: true });
                
                // If the admin API returns user data in the same format, uncomment this
                // Check the structure of response.data and adjust accordingly
                // setData(response.data.data.user);
                console.log(response);
            } catch(err) {
                console.log("error while checking if logged in");
                console.log(err);
                navigate("/admin/login");
            }
        };

        getUser();
    }, [navigate]);

    return (
        <div className="navbar py-3 px-6 flex-1 w-full md:w-[80vw] h-[80px] flex items-center justify-between md:justify-end backdrop-blur-md bg-white/10 rounded-lg">
            {/* Logo for mobile view - only visible on small screens */}
            <a href="/admin/dashboard" className="sidebar_logo_nav md:hidden h-auto flex flex-row items-center">
                <img
                    className="h-[40px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
                    alt="logo"
                />
                <div className="sideBar_branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5">
                    <span className="uppercase">panipat insitute of</span>
                    <span className="uppercase">Engineering and</span>
                    <span className="uppercase">technology</span>
                </div>
            </a>
            
            {/* User Profile */}
            <a href="/admin/profile" className="navProfile text-black user w-[220px] h-full flex flex-row items-center gap-4 p-2 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-md hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] shadow-md">
                {/* Profile Image */}
                <div className="left flex justify-center items-center">
                    <img 
                        className="w-[55px] h-[55px] rounded-full border-[3px] border-white shadow-lg"
                        src={data.profileImage} 
                        alt="user" 
                    />
                </div>

                {/* Name & Role */}
                <div className="right text-black">
                    <p className="text-lg font-semibold name">{data.fullName}</p>
                    <p className="text-sm text-zinc-900 designation">{data.designation}</p>
                </div>
            </a>
        </div>
    );
};

export default AdminNavbar;