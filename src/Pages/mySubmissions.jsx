import React from "react";
import Navbar from "../Components/navbar.jsx";

import SideBar from "../Components/sidebar.jsx";

const UserWelcome = ()=>{
    return(
        <div className="w-full h-[100px] flex pt-5 pb-5  flex-col">
            <h3 className="font-bold text-2xl" >Hello, Dr. Anju Bhandari</h3>
            <h6 className="font-semibold text-[14px] text-gray-500">Nice to have you back, what an exciting day .</h6>
        </div>
    )
}

const Options = ()=>{   
    return(
        <div className="actions w-max h-auto bg-white shadow-2xl  flex-row  rounded-2xl flex gap-20 flex- p-20" >
            <a
                href="/claim"
                className="w-[200px] h-[180px] shadow-lg bg-[#EDEFFD] flex flex-col rounded-2xl group hover:scale-[1.09] transition-all "
                onClick={() => { console.log("clicked"); }}
            >
                <div className="flex-1 flex items-center justify-center">
                    <i className="fa-regular fa-file text-6xl"></i>
                </div>
                <p className="h-[40px] bg-amber-300 flex justify-center items-center gap-2 text-[16px] font-medium rounded-b-2xl">
                    <i className="fa-solid fa-star"></i>
                    Claim
                </p>
            </a>

            <a
                href="/claim"
                className="w-[200px] h-[180px] shadow-lg bg-[#EDEFFD] flex flex-col rounded-2xl group hover:scale-[1.09] transition-all"
                onClick={() => { console.log("clicked"); }}
            >
                <div className="flex-1 flex items-center justify-center">
                    <i className="fa-regular fa-folder text-6xl"></i>
                </div>
                <p className="h-[40px] bg-amber-300 flex justify-center items-center gap-2 text-[16px] font-medium rounded-b-2xl">
                    <i className="fa-solid fa-star"></i>
                    My Submissions
                </p>
            </a>

            <a
                href="/claim"
                className="w-[200px] h-[180px] shadow-lg bg-[#EDEFFD] flex flex-col rounded-2xl group hover:scale-[1.09] transition-all"
                onClick={() => { console.log("clicked"); }}
            >
                <div className="flex-1 flex items-center justify-center">
                    <i className="fa-regular fa-user text-6xl"></i>
                </div>
                <p className="h-[40px] bg-amber-300 flex justify-center items-center gap-2 text-[16px] font-medium rounded-b-2xl">
                    <i className="fa-solid fa-star"></i>
                    Profile
                </p>
            </a>
        </div>
    )
}

const Dashboard = ()=>{
    return(
        <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
            <SideBar/>
            <div className="content w-full h-full flex flex-col ">
                    <Navbar/>
                    <div className="areaContent bg-[#EDEFFD] flex w-full h-auto py-[20px] px-[20px] min-h-[calc(100vh-120px)] h-auto rounded-2xl mt-5 shadow-2xs flex-col p-10">
                        <UserWelcome/>
                        <Options/>
                    </div> 
            </div>
        </div>
    )
}

export default Dashboard ; 