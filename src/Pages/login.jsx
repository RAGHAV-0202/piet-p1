import { useState } from "react";
import React from "react";
import "../CSS/responsive.css"
import bgImg from "../assets/image.png"

const Progress = ()=>{
  return(
      <div className="progress  w-full h-[80px] flex flex-row justify-between items-center border-b-[1px] border-gray-300 pb-3">

          <button  className="progress_indicator w-max  h-full px-1  flex items-center justify-between gap-3">
              <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-lg  bg-blue-600 `}>
                <p className={`text-[16px] text-grey "text-white"`} ></p>
              </div>
              <p className="text-[18px] font-medium">Enter Credentials</p>
          </button>

      </div>
  )
}

const Info = ()=>{
  return(
    <div className="info  w-full h-[80px] flex flex-col">
      {/* <p className="text-[15px] text-gray-500">Step/p> */}
      <p className="text-[25px] font-bold mt-2">Login</p>
    </div>
  )
}

const LoginNav = ()=>{
  return(
    <div className="navbar shadow-2xl px-10 w-screen h-[60px]">
          <div  className="logo h-auto w-[280px] flex flex-row items-center ">
              <div className="h-[60px]"> <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></div>

              <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                  <span className="uppercase">panipat insitute of</span>
                  <span className="uppercase">Engineering and</span>
                  <span className="uppercase">technology</span>
              </div>
          </div>
    </div>
  )
}


export default function Login() {

  const [formData, setFormData] = React.useState({
   email: "",
    password: "",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return(
    <div className="register_page w-screen h-screen bg-[#EDEFFD] flex flex-col items-center">
        <LoginNav/>
      
        <div className="content w-screen h-[calc(100vh - 60px)] flex flex-row  flex-1">

        <div className="left w-[50%] h-full rounded-l-3xl p-20 flex flex-col gap-10 items-center justify-center ">

          <div className="inputArea flex flex-col w-full h-auto min-h-[400px] max-w-[600px]">
              <>
                <span className="mb-5">
                  <span className="pb-5">Email Address</span>
                  <input name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="jon@domain.com" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Enter Password</span>
                  <input name="password" value={formData.password} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="password" placeholder="Set Password" />
                </span>
              </>
            </div>

            <div className="buttonArea max-w-[600px] w-full h-[80px] flex flex-row justify-between items-center relative">
                <button 
                    onClick={() => console.log(formData)}
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                    Submit
                </button>
            </div>
        </div>

        <div className="right w-[50%] h-full rounded-r-3xl flex items-center justify-center">
            <img className="w-full" src={bgImg} alt="bg"></img>
        </div>

        </div>
    </div>
  )
}
