import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/responsive.css";
import { useState, useEffect } from "react";
import baseUrl from "../baseurl.js";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout(){
    try{
      await axios.post(`${baseUrl}api/admin/logout`, { withCredentials: true }, { withCredentials: true });
      navigate("/admin/login");
    } catch(err){
      console.log("error while logging out");
      console.log(err);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add/remove blur effect on main content when menu opens/closes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      if (isMenuOpen) {
        mainContent.classList.add('content-blur');
      } else {
        mainContent.classList.remove('content-blur');
      }
    }
  }, [isMenuOpen]);

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

  return (
    <>
      {/* Mobile menu toggle button - visible only on small screens */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={toggleMenu}
      >
        <i className={`fa-regular ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Desktop Sidebar */}
      <div className="sidebar hidden md:flex w-[20%] h-[100vh] bg-white flex-col items-center py-[20px] px-[2%] sticky top-0">
        <a href="/admin/dashboard" className="sidebar_logo h-auto w-[280px] flex flex-row items-center">
          <button className="h-[60px]">
            <img
              className="h-[60px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
              alt="logo"
            />
          </button>

          <div className="sideBar_branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5">
            <span className="uppercase">panipat insitute of</span>
            <span className="uppercase">Engineering and</span>
            <span className="uppercase">technology</span>
          </div>
        </a>

        <div className="sidebar_options w-full py-20 h-full flex flex-col gap-[40px] transition-all duration-100 justify-between">
          <div className="dashboard_links_div py-20 flex flex-col gap-[40px]">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105"
              >
                <span className="w-[50px] flex items-center justify-center h-full">
                  <i className={`fa-regular ${item.icon} text-2xl transition-all duration-300`}></i>
                </span>

                <span className="text_sidebar_option text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                  {item.text}
                </span>
              </a>
            ))}
          </div>
          <div className="logout_div">
            <button
              onClick={handleLogout}
              className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105"
            >
              <span className="w-[50px] flex items-center justify-center h-full">
                <i className="fa-regular fa-right-from-bracket text-2xl transition-all duration-300"></i>
              </span>

              <span className="text_sidebar_option text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Slide in from left */}
      <div 
        className={`fixed md:hidden top-0 left-0 z-40 h-full w-[80%] max-w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile header with logo */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <img
              className="h-[40px] w-[40px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU"
              alt="logo"
            />
            <div className="ml-2 text-sm font-semibold">
              <span className="block uppercase">PIET</span>
            </div>
          </div>
        </div>

        {/* Mobile navigation links */}
        <div className="py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center px-4 py-3 text-black hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-8 flex justify-center">
                <i className={`fa-regular ${item.icon} text-lg`}></i>
              </span>
              <span className="ml-3 font-medium">{item.text}</span>
            </a>
          ))}
          
          <div className="border-t mt-4 pt-4">
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 text-black hover:bg-purple-50"
            >
              <span className="w-8 flex justify-center">
                <i className="fa-regular fa-right-from-bracket text-lg"></i>
              </span>
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Semi-transparent overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed md:hidden inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSideBar;