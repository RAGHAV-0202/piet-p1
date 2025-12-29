import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseurl";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await axios.post(`${baseUrl}api/auth/logout`, { withCredentials: true }, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      console.log("error while logging out");
      console.log(err);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add/remove blur effect on main content when menu opens/closes
  // useEffect(() => {
  //   const mainContent = document.getElementById('main-content');
  //   if (mainContent) {
  //     if (isMenuOpen) {
  //       mainContent.classList.add('content-blur');
  //     } else {
  //       mainContent.classList.remove('content-blur');
  //     }
  //   }
  // }, [isMenuOpen]);

  // Menu items data for easier management
  const menuItems = [
    { 
      path: "/admin/dashboard", 
      icon: "fa-house", 
      text: "Dashboard" 
    },
    { 
      path: "/admin/submissions", 
      icon: "fa-folder", 
      text: "All Submissions" 
    },
    { 
    path: "/admin/users", 
    icon: "fa-user", 
    text: "All Users" 
  }
  ];

  // Determine active menu item based on current path
  const currentPath = window.location.pathname;

  return (
    <>
      {/* Mobile menu toggle button - visible only on small screens */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={toggleMenu}
      >
        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-48 min-h-screen bg-white border-r">
        {/* Institute Logo & Name */}
        <div className="p-4 border-b">
          <a href="/dashboard" className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-2">
              <img
                className="w-full h-full object-contain"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
                alt="PIET logo"
              />
            </div>
            <div className="text-xs font-bold text-blue-900 leading-tight">
              <span className="block uppercase">PANIPAT INSTITUTE OF</span>
              <span className="block uppercase">ENGINEERING AND</span>
              <span className="block uppercase">TECHNOLOGY</span>
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            {menuItems.map((item, index) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-green-50 text-green-600 border-l-4 border-green-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center mr-3`}></i>
                  <span className="text-sm">{item.text}</span>
                </a>
              );
            })}
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Slide in from left */}
      <div 
        className={`fixed md:hidden top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile header with logo */}
        <div className="flex items-center p-4 border-b">
          <div className="flex items-center">
            <img
              className="h-8 w-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
              alt="logo"
            />
            <div className="ml-2 text-xs font-bold text-blue-900">
              <span className="block uppercase">PIET</span>
            </div>
          </div>
          <button 
            className="ml-auto text-gray-500"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Mobile navigation links */}
        <nav className="py-4">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg ${
                  isActive 
                    ? 'bg-green-50 text-green-600 border-l-4 border-green-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center mr-3`}></i>
                <span className="text-sm">{item.text}</span>
              </a>
            );
          })}
        </nav>
        
        {/* Mobile Logout */}
        <div className="border-t mt-auto">
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="flex items-center w-full px-6 py-4 text-gray-600"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center mr-3"></i>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Semi-transparent overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed md:hidden inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSideBar;