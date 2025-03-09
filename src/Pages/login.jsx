import { useState } from "react";
import React from "react";

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


export default function Login() {

  const [formData, setFormData] = React.useState({
   email: "",
    password: "",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return(
    <div className="register_page w-screen h-screen bg-[#EDEFFD] flex items-center justify-center">
      <div className="centered w-full h-full max-w-[1400px] max-h-[900px] flex flex-row rounded-3xl shadow-2xl">
        <div className="left w-[60%] h-full rounded-l-3xl p-20 flex flex-col gap-10">
        <Progress/>
        <Info/>
          <div className="inputArea flex flex-col w-full h-auto min-h-[400px]">
            
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

            <div className="buttonArea w-full h-[80px] flex flex-row justify-between items-center relative">
                <button 
                    onClick={() => console.log(formData)}
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                    Submit
                </button>
            </div>
        </div>
        <div className="right w-[40%] h-full bg-red-200 rounded-r-3xl">
            <img className="w-full h-full rounded-r-3xl" src="https://images.gofundme.com/w_nznP4WEpEFX0PNzn0zvyQ2J8k=/640x480/https://d2g8igdw686xgo.cloudfront.net/72501389_1687367121294329_r.jpeg" alt="bg"></img>
        </div>

      </div>
    </div>
  )
}
