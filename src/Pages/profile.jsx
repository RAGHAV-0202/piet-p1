import React from "react";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";

const Profile = () => {
  const user = {
    profileImage: "https://via.placeholder.com/150", // Replace with actual image URL
    name: "Dr. Anju Bhandari",
    email: "anju.bhandari@example.com",
    department: "Computer Science",
    designation: "Professor",
    employeeId: "EMP123456",
    scopusId: "SCOPUS123456",
    vidhwanId: "VIDHWAN123456",
    googleScholarId: "https://scholar.google.com/citations?user=XXXXXXX",
    orcId: "https://orcid.org/0000-0000-0000-0000",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    branch: "HDFC Bank, New Delhi",
  };

  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <SideBar />
      <div className="content w-full h-full flex flex-col">
        <Navbar />
        <div className="areaContent bg-[#EDEFFD] flex w-full h-auto  min-h-[calc(100vh-120px)] h-auto rounded-2xl mt-5 shadow-lg flex-col items-center">
            <div className="bg bg-red-700 flex w-full h-[200px] rounded-3xl overflow-hidden"> 
                <img className="w-full h-full" src="https://static.vecteezy.com/system/resources/previews/012/972/566/large_2x/color-meaning-of-color-variety-color-value-background-color-free-photo.jpg" alt="bg"></img>
            </div>
            <div className="info p-10 flex flex1 w-full h-full flex-col ">
                <div className="image overflow-hidden object-center  mb-[50%]   w-[200px] h-[200px] bg-amber-200 border-[10px] border-white rounded-[50%] absolute translate-y-[-70%]">
                    <img className="w-full h-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user"></img>/
                </div>                
                <div className="details pt-[80px]">
                    <h1 className="py-5 text-4xl font-bold leading-0">Dr. Anju Bhandari </h1>
                    <h4 className="py-5 text-xl font-semibold leading-0 text-zinc-600" >Assistant Professor</h4>
                </div>
                  <div className="moreDetails pt-10">
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Email:</span> {user.email}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Employee ID:</span> {user.employeeId}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Scopus ID:</span> {user.scopusId}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Vidhwan ID:</span> {user.vidhwanId}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Google Scholar:</span> <a href={user.googleScholarId} className="text-blue-600" target="_blank" rel="noopener noreferrer">Profile</a></p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">ORCID:</span> <a href={user.orcId} className="text-blue-600" target="_blank" rel="noopener noreferrer">Profile</a></p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Bank Account:</span> {user.accountNumber}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">IFSC Code:</span> {user.ifscCode}</p>
                      <p className="text-lg flex flex-col pb-6"><span className="font-bold font-[22px] text-zinc-500">Branch:</span> {user.branch}</p>
                  </div>
            </div>
        </div>  
      </div>
    </div>
  );
};

export default Profile;
