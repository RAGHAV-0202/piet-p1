import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";
import axios from "axios";
import baseUrl from "../baseurl.js";
import "../CSS/profile.css";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="bg bg-gray-200 animate-pulse flex w-full h-[200px] rounded-3xl overflow-hidden"></div>
      <div className="info p-10 flex flex1 w-full h-full flex-col">
        <div className="image overflow-hidden object-center mb-[50%] w-[200px] h-[200px] bg-gray-200 animate-pulse border-[10px] border-white rounded-[50%] absolute translate-y-[-70%]"></div>
        <div className="details pt-[80px]">
          <div className="py-5 h-10 w-72 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="py-5 h-6 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="moreDetails pt-10">
          {Array(9).fill(0).map((_, index) => (
            <div key={index} className="pb-6">
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="h-6 w-64 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const [user, setUser] = useState({ fullName: "Name Surname" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${baseUrl}api/profile/profile`, { withCredentials: true });
        setUser(response.data?.data);
      } catch (err) {
        console.log("error while getting profile");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  console.log(user);

  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <SideBar />
      <div className="content w-full h-full flex flex-col">
        <Navbar />
        <div className="areaContent bg-[#EDEFFD] flex w-full h-auto min-h-[calc(100vh-120px)] rounded-2xl mt-5 shadow-lg flex-col items-center">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="bg bg-red-700 flex w-full h-[200px] rounded-3xl overflow-hidden">
                <img className="w-full h-full" src="https://static.vecteezy.com/system/resources/previews/012/972/566/large_2x/color-meaning-of-color-variety-color-value-background-color-free-photo.jpg" alt="bg"></img>
              </div>
              <div className="info p-10 flex flex1 w-full h-full flex-col">
                <div className="image overflow-hidden object-center mb-[50%] w-[200px] h-[200px] bg-amber-200 border-[10px] border-white rounded-[50%] absolute translate-y-[-70%]">
                  <img className="w-full h-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user"></img>/
                </div>
                <div className="details pt-[80px]">
                  <h1 className="py-5 text-4xl font-bold leading-0">{user.fullName}</h1>
                  <h4 className="py-5 text-xl font-semibold leading-0 text-zinc-600">{user.designation}</h4>
                </div>
                <div className="moreDetails pt-10">
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Email:</span> {user.email}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Employee ID:</span> {user.employeeId}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Scopus ID:</span> {user.scopusId}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Vidhwan ID:</span> {user.vidhwanId}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Google Scholar:</span> <a href={user.googleScholarId} className="text-blue-600" target="_blank" rel="noopener noreferrer">Profile</a></p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">ORCID:</span> <a href={user.orcId} className="text-blue-600" target="_blank" rel="noopener noreferrer">Profile</a></p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Bank Account:</span> {user.bankAccount}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">IFSC Code:</span> {user.ifsc}</p>
                  <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Branch:</span> {user.branch}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;