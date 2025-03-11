import { useState } from "react";
import React from "react";

const Progress = (props)=>{
  return(
      <div className="progress  w-full h-[80px] flex flex-row justify-between items-center border-b-[1px] border-gray-300 pb-3">

          <button onClick={()=>{props.setStep(1)}} className="progress_indicator w-[20%]  h-full px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-lg  ${props.step == 1 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 1 ? "text-white" : "text-grey"}`} >1</p>
              </div>
              <p className="text-[18px] font-medium">Login Details</p>
          </button>

          <button onClick={()=>{props.setStep(2)}} className="progress_indicator w-[20%] h-full px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-lg  ${props.step == 2 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 2 ? "text-white" : "text-grey"}`}>2</p>
              </div>
              <p className="text-[18px] font-medium">Basic Details</p>
          </button>

          <button onClick={()=>{props.setStep(3)}} className="progress_indicator w-[20%] h-full px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-lg  ${props.step == 3 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 3 ? "text-white" : "text-grey"}`}>3</p>
              </div>
              <p className="text-[18px] font-medium">More Details</p>
          </button>

          <button onClick={()=>{props.setStep(4)}} className="progress_indicator w-[20%] h-full px-1 flex items-center justify-between gap-1">
              <div className = {`flex items-center justify-center w-[40px] h-[40px] rounded-lg  ${props.step == 4 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 4 ? "text-white" : "text-grey"}`}>4</p>
              </div>
              <p className="text-[18px] font-medium">Bank Details</p>
          </button>


      </div>
  )
}

const Info = (props)=>{
  return(
    <div className="info  w-full h-[80px] flex flex-col">
      <p className="text-[15px] text-gray-500">Step {props.step}/4</p>
      <p className="text-[25px] font-bold mt-2">Sign Up</p>
    </div>
  )
}



export default function Register() {

  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    designation: "",
    employeeId: "",
    scopusId: "",
    vidwanId: "",
    googleScholarId: "",
    bankAccountNumber: "",
    ifscCode: "",
    branch: "",
    doj : "" ,
    orcid : "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return(
    <div className="register_page w-screen h-screen bg-[#EDEFFD] flex items-center justify-center">
      <div className="centered w-full h-full max-w-[1400px] max-h-[900px] flex flex-row rounded-3xl shadow-2xl">
        <div className="left w-[60%] h-full rounded-l-3xl p-20 flex flex-col gap-10">
          <Progress step={step} setStep={setStep}/>
          <Info step={step} />
          <div className="inputArea flex flex-col w-full h-auto min-h-[400px]">
            {step == 1 && (
              <>
                <span className="mb-5">
                  <span className="pb-5">Full Name</span>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Jon Doe" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Email Address</span>
                  <input name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="jon@domain.com" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Set Password</span>
                  <input name="password" value={formData.password} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="password" placeholder="Set Password" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Confirm Password</span>
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="password" placeholder="Set Password" />
                </span>
              </>
            )}
            {step == 2 && (
              <>
                <span className="mb-5">
                  <span className="pb-5">Joining Date</span>
                  <input name="doj" value={formData.doj} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="date" placeholder="CSE" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Department</span>
                  <input name="department" value={formData.department} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="CSE" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Designation</span>
                  <input name="designation" value={formData.designation} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Professor" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Employee ID</span>
                  <input name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="ХХХХХХХХХХХ" />
                </span>
              </>
            )}
            {step == 3 && (
              <>
                <span className="mb-5">
                  <span className="pb-5">Scopus ID</span>
                  <input name="scopusId" value={formData.scopusId} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Scopus Id" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Vidwan ID</span>
                  <input name="vidwanId" value={formData.vidwanId} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Vidwan ID" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Google Scholar ID</span>
                  <input name="googleScholarId" value={formData.googleScholarId} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Google Scholar ID" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">ORCID ID</span>
                  <input name="orcid" value={formData.orcid} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="ORCID ID" />
                </span>
              </>
            )}
            {step == 4 && (
              <>
                <span className="mb-5">
                  <span className="pb-5">Bank Account Number</span>
                  <input name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Account Number" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">IFSC Code</span>
                  <input name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="SBINxxxxxx" />
                </span>
                <span className="mb-5">
                  <span className="pb-5">Branch</span>
                  <input name="branch" value={formData.branch} onChange={handleChange} className="w-full mt-1 h-8 rounded-lg border-[1px] border-blue-400 px-3 py-6" type="text" placeholder="Branch xx" />
                </span>
              </>
            )}



            </div>

            <div className="buttonArea w-full h-[80px] flex flex-row justify-between items-center relative">

              {step > 1 && 
                <button 
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition absolute left-0">
                    Back
                </button> 
              }
              {step < 4 && 
                <button 
                onClick={() => setStep((prevStep) => prevStep + 1)}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                  Next
                </button>
              }

              {step == 4 && 
                <button 
                onClick={() => console.log(formData)}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                  Submit
                </button>
              }
                
            </div>
        </div>
        <div className="right w-[40%] h-full bg-red-200 rounded-r-3xl">
            <img className="w-full h-full rounded-r-3xl" src="https://images.gofundme.com/w_nznP4WEpEFX0PNzn0zvyQ2J8k=/640x480/https://d2g8igdw686xgo.cloudfront.net/72501389_1687367121294329_r.jpeg" alt="bg"></img>
        </div>

      </div>
    </div>
  )
}
