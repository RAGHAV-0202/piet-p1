import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../baseurl.js";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "Name Surname",
    profileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    designation: "Staff"
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${baseUrl}api/auth/loggedIn`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.data.user);
      } catch (err) {
        console.log("error while checking if logged in", err);
        navigate("/login");
      }
    };

    getUser();
  }, [navigate]);


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}api/auth/logout`,
        { withCredentials: true },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.log("error while logging out");
      console.log(err);
    }
  };

  return (
    <header className="bg-white border-b flex justify-between items-center p-4">
      {/* Left side - Institute Logo for mobile (visible on mobile only) */}
      <div className="md:hidden flex items-center">
        <img
          className="h-8 w-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
          alt="PIET logo"
        />
        <div className="ml-2 text-xs font-bold text-blue-900">
          <span className="block uppercase">PIET</span>
        </div>
      </div>
      
      {/* Spacer for desktop */}
      <div className="hidden md:block"></div>
      
      {/* Right side - Notifications + User Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <NotificationBell />
        <div className="profile-dropdown relative">
        <button 
          className="flex items-center space-x-3 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-blue-900">{data.fullName}</div>
            <div className="text-xs text-gray-500">{data.designation}</div>
          </div>
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              className="h-full w-full object-cover"
              src={data.profileImage} 
              alt="Profile" 
            />
          </div>
        </button>
        
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <a 
              href="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-user mr-2"></i>
              Your Profile
            </a>
            {/* <a 
              href="/settings" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-gear mr-2"></i>
              Settings
            </a> */}
            <div className="border-t border-gray-100"></div>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
              Logout
            </button>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default Navbar;