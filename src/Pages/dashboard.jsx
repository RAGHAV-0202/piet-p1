import React from "react";
import Navbar from "../Components/navbar.jsx";
import axios from "axios";
import SideBar from "../Components/sidebar.jsx";
import baseUrl from "../baseurl.js";

const UserWelcome = ()=>{

    const [data , setData] = React.useState({fullName : "Name Surname"})

    React.useState(()=>{
        async function getUser(){
            try{
                const response = await axios.get(`${baseUrl}api/profile/profile` , {withCredentials : true} , {withCredentials : true})
                // console.log(response)
                setData(response.data?.data)
            }catch(err){
                console.log("error while getting profile")
                console.log(err)
            }
        }

        getUser()
    } , [])

    console.log("data")
    console.log(data)


    return(
        <div className="w-full h-[100px] flex pt-5 pb-5  flex-col">
            <h3 className="font-bold text-2xl" >Hello, {data.fullName}</h3>
            <h6 className="font-semibold text-[14px] text-gray-500">Nice to have you back, what an exciting day .</h6>
        </div>
    )
}

const Options = () => {
    return (
        <div className="actions w-full flex flex-wrap gap-10 p-10 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl">
            {[
                { href: "/claim", icon: "fa-file", text: "Claim" },
                { href: "/submissions", icon: "fa-folder", text: "My Submissions" },
                { href: "/profile", icon: "fa-user", text: "Profile" }
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

const Dashboard = ()=>{
    return(
        <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
            <SideBar/>
            <div className="content w-full h-full flex flex-col ">
                    <Navbar/>
                    <div className="areaContent bg-[#EDEFFD] flex w-full h-full py-[20px] px-[20px] min-h-[calc(100vh-150px)] h-auto rounded-2xl mt-5 shadow-2xs flex-col p-10">
                        <UserWelcome/>
                        <Options/>
                    </div> 
            </div>
        </div>
    )
}

export default Dashboard ; 