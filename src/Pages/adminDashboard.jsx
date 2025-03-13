import React from "react";
import Navbar from "../Components/navbar.jsx";
import axios from "axios";
// import SideBar from "../Components/sidebar.jsx";
import baseUrl from "../baseurl.js";
import { useNavigate } from "react-router-dom";

// const UserWelcome = ()=>{

//     const [data , setData] = React.useState({fullName : "Name Surname"})

//     React.useState(()=>{
//         async function getUser(){
//             try{
//                 const response = await axios.get(`${baseUrl}api/profile/profile` , {withCredentials : true} , {withCredentials : true})
//                 // console.log(response)
//                 setData(response.data?.data)
//             }catch(err){
//                 console.log("error while getting profile")
//                 console.log(err)
//             }
//         }

//         getUser()
//     } , [])

//     console.log("data")
//     console.log(data)


//     return(
//         <div className="w-full h-[100px] flex pt-5 pb-5  flex-col">
//             <h3 className="font-bold text-2xl" >Hello, {data.fullName}</h3>
//             <h6 className="font-semibold text-[14px] text-gray-500">Nice to have you back, what an exciting day .</h6>
//         </div>
//     )
// }

const SideBar = ()=>{
    const navigate = useNavigate()

    async function handleLogout(){
        try{
            await axios.post(`${baseUrl}api/admin/logout` , { withCredentials: true } , { withCredentials: true })
            navigate("/admin/login")
        }catch(err){
            console.log("error while logging out")
            console.log(err)
        }
    }

    return(
        <div className="sidebar w-[20%] h-dvh bg-white flex flex-col items-center py-[20px] px-[2%]">

            <a href="/admin/dashboard" className="logo h-auto w-[280px] flex flex-row items-center ">
                <button className="h-[60px]"> <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></button>

                <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                    <span className="uppercase">panipat insitute of</span>
                    <span className="uppercase">Engineering and</span>
                    <span className="uppercase">technology</span>
                </div>
            </a>




            <div className="options w-full py-20 h-full  flex-col gap-[40px] transition-all duration-100 justify-between flex flex-col">
                <div className=" py-20 flex flex-col gap-[40px]">
                    <a href="/admin/dashboard" 
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-house text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Dashboard
                        </span>
                    </a>

                    {/* Claim */}

                    {/* My Submissions */}
                    <a href="/admin/submissions" 
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-folder text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Submissions
                        </span>
                    </a>
                    <button onClick={handleLogout}
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-right-from-bracket text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Logout
                        </span>
                    </button>   
                </div>
            </div>



        </div>
    )
}

const Options = () => {
    return (
        <div className="actions w-full flex flex-wrap gap-10 p-10 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl">
            {[
                { href: "/admin/submissions", icon: "fa-folder", text: "ALl Submissions" },
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

const AdminDashboard = ()=>{
    return(
        <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
            <SideBar/>
            <div className="content w-full h-full flex flex-col ">
                    <Navbar/>
                    <div className="areaContent bg-[#EDEFFD] flex w-full h-full py-[20px] px-[20px] min-h-[calc(100vh-150px)] h-auto rounded-2xl mt-5 shadow-2xs flex-col p-10">
                        {/* <UserWelcome/> */}
                        <Options/>
                    </div> 
            </div>
        </div>
    )
}

export default AdminDashboard ; 