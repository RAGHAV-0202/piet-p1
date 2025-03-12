import { useState } from "react";
import React from "react";
import bgImg from "../assets/image.png"
import baseUrl from "../baseurl";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../CSS/responsive.css"

const Progress = (props)=>{
  return(
      <div className="progress  w-full h-[60px] flex flex-row justify-between border-b-[1px] pb-[10px] border-gray-300  mb-[32px]">

          <button onClick={()=>{props.setStep(1)}} className="progress_indicator w-[20%]   h-[50px] px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[30px] h-[30px] rounded-lg  ${props.step == 1 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 1 ? "text-white" : "text-grey"}`} >1</p>
              </div>
              <p className="text-[14px] font-medium  text-left">Login Details</p>
          </button>

          <button onClick={()=>{props.setStep(2)}} className="progress_indicator w-[20%]  h-[50px] px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[30px] h-[30px] rounded-lg  ${props.step == 2 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 2 ? "text-white" : "text-grey"}`}>2</p>
              </div>
              <p className="text-[14px] font-medium  text-left">Basic Details</p>
          </button>

          <button onClick={()=>{props.setStep(3)}} className="progress_indicator w-[20%]  h-[50px] px-1  flex items-center justify-between gap-1">
              <div className={`flex items-center justify-center w-[30px] h-[30px] rounded-lg  ${props.step == 3 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 3 ? "text-white" : "text-grey"}`}>3</p>
              </div>
              <p className="text-[14px] font-medium  text-left">More Details</p>
          </button>

          <button onClick={()=>{props.setStep(4)}} className="progress_indicator w-[20%]  h-[50px] px-1 flex items-center justify-between gap-1">
              <div className = {`flex items-center justify-center w-[30px] h-[30px] rounded-lg  ${props.step == 4 ? "bg-blue-600" : "bg-zinc-400"}  `}>
                <p className={`text-[16px] text-grey ${props.step == 4 ? "text-white" : "text-grey"}`}>4</p>
              </div>
              <p className="text-[14px] font-medium  text-left">Bank Details</p>
          </button>


      </div>
  )
}


const LoginNav = ()=>{
  return(
    <div className="navbar shadow-2xl px-10 w-full h-[60px] flex items-center bg-white">

          <div  className="logo h-auto w-[280px] flex flex-row items-center ">
              <div className="h-[60px] flex items-center"> <img className="h-[50px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></div>

              <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                  <span className="uppercase">panipat insitute of</span>
                  <span className="uppercase">Engineering and</span>
                  <span className="uppercase">technology</span>
              </div>
          </div>
    </div>
  )
}

const Info = (props)=>{
  return(
    <div className="info  w-full h-[80px] flex flex-col">
      <p className="text-[15px] text-gray-500">Step {props.step}/4</p>
      <p className="text-[20px] font-bold mt-2">Sign Up</p>
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
    vidhwanId: "",
    googleScholarId: "",
    bankAccount: "",
    ifsc: "",
    branch: "",
    doj: "",
    orcidId: ""
  });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Mark field as touched
    setTouched({ ...touched, [e.target.name]: true });
    // Validate the field on change
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let error = "";
    
    if (!value.trim()) {
      error = "Required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateStep = (stepNumber) => {
    let valid = true;
    let newTouched = { ...touched };
    let newErrors = { ...errors };
    
    const fieldsToValidate = {
      1: ["fullName", "email", "password", "confirmPassword"],
      2: ["doj", "department", "designation", "employeeId"],
      3: ["scopusId", "vidhwanId", "googleScholarId", "orcidId"],
      4: ["bankAccount", "ifsc", "branch"]
    };
    
    // Mark all fields in current step as touched
    fieldsToValidate[stepNumber].forEach(field => {
      newTouched[field] = true;
      const isValid = validateField(field, formData[field]);
      if (!isValid) valid = false;
    });
    
    setTouched(newTouched);
    
    return valid;
  };

  const handleNextStep = () => {
    const isValid = validateStep(step);
    if (isValid) {
      setStep(prevStep => prevStep + 1);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const isValid = validateStep(4);
    if (!isValid) return;
    
    try {
      const response = await axios.post(baseUrl + "api/auth/register", formData, { withCredentials: true });
      // console.log(response);
      navigate("/dashboard")

      // Add success message or redirect logic here
    } catch (error) {
      console.log("Error while registering");
      console.log(error);
      // Add error handling here
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full mt-1 h-[2%] rounded-lg border-[1px] px-3 py-[1%]";
    // Only show error border if field has been touched and has an error
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500`;
    }
    return `${baseClass} border-blue-400`;
  };

  // Function to display error message
  const showError = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>;
    }
    return null;
  };


  return(
      <div className="register_page w-full h-full min-h-screen bg-[#EDEFFD] flex flex-col items-center overflow-x-hidden">

        <LoginNav/>
      
        <div className="content w-screen min-h-[calc(100vh - 60px)] h-full flex flex-row items-center justify-center  flex-1 overflow-x-hidden">

            <div className="left max-w-full min-h-[calc(100vh - 70px)] h-full rounded-l-3xl flex flex-col gap-5    items-center justify-center overflow-x-hidden">

              <div className="form max-w-[600px] h-[auto] ">
                  <Progress step={step} setStep={setStep}/>
                  {/* <Info step={step} /> */}
                  <div className="inputArea flex flex-col w-full h-auto max-w-[600px] ">
                    {step == 1 && (
                      <>
                        <span className="mb-[10PX]">
                          <span className="pb-5 text-[14px] ">Full Name</span>
                          <input 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, fullName: true})}
                            className={getInputClass("fullName")} 
                            type="text" 
                            placeholder="Jon Doe" 
                          />
                          {showError("fullName")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5 text-[14px] ">Email Address</span>
                          <input 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, email: true})}
                            className={getInputClass("email")} 
                            type="text" 
                            placeholder="jon@domain.com" 
                          />
                          {showError("email")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5 text-[14px] ">Set Password</span>
                          <input 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, password: true})}
                            className={getInputClass("password")} 
                            type="password" 
                            placeholder="Set Password (Min Length 6)" 
                          />
                          {showError("password")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5 text-[14px] ">Confirm Password</span>
                          <input 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, confirmPassword: true})}
                            className={getInputClass("confirmPassword")} 
                            type="password" 
                            placeholder="Set Password (Min Length 6)" 
                          />
                          {showError("confirmPassword")}
                        </span>
                      </>
                    )}
                    {step == 2 && (
                      <>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Joining Date</span>
                          <input 
                            name="doj" 
                            value={formData.doj} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, doj: true})}
                            className={getInputClass("doj")} 
                            type="date" 
                          />
                          {showError("doj")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Department</span>
                          <select 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, department: true})}
                            className={getInputClass("department")}
                          >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="AIML">AIML</option>
                            <option value="AIDS">AIDS</option>
                            <option value="CYS">CYS</option>
                            <option value="IT">IT</option>
                            <option value="ME">ME</option>
                            <option value="TEXTILE">TEXTILE</option>
                            <option value="CIVIL">CIVIL</option>
                          </select>
                          {showError("department")}
                        </span>

                        <span className="mb-[10PX]">
                          <span className="pb-5">Designation</span>
                          <input 
                            name="designation" 
                            value={formData.designation} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, designation: true})}
                            className={getInputClass("designation")} 
                            type="text" 
                            placeholder="Professor" 
                          />
                          {showError("designation")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Employee ID</span>
                          <input 
                            name="employeeId" 
                            value={formData.employeeId} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, employeeId: true})}
                            className={getInputClass("employeeId")} 
                            type="text" 
                            placeholder="ХХХХХХХХХХХ" 
                          />
                          {showError("employeeId")}
                        </span>
                      </>
                    )}
                    {step == 3 && (
                      <>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Scopus ID</span>
                          <input 
                            name="scopusId" 
                            value={formData.scopusId} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, scopusId: true})}
                            className={getInputClass("scopusId")} 
                            type="text" 
                            placeholder="Scopus Id" 
                          />
                          {showError("scopusId")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Vidwan ID</span>
                          <input 
                            name="vidhwanId" 
                            value={formData.vidhwanId} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, vidhwanId: true})}
                            className={getInputClass("vidhwanId")} 
                            type="text" 
                            placeholder="Vidwan ID" 
                          />
                          {showError("vidhwanId")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Google Scholar ID</span>
                          <input 
                            name="googleScholarId" 
                            value={formData.googleScholarId} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, googleScholarId: true})}
                            className={getInputClass("googleScholarId")} 
                            type="text" 
                            placeholder="Google Scholar ID" 
                          />
                          {showError("googleScholarId")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">ORCID ID</span>
                          <input 
                            name="orcidId" 
                            value={formData.orcidId} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, orcidId: true})}
                            className={getInputClass("orcidId")} 
                            type="text" 
                            placeholder="ORCID ID" 
                          />
                          {showError("orcidId")}
                        </span>
                      </>
                    )}
                    {step == 4 && (
                      <>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Bank Account Number</span>
                          <input 
                            name="bankAccount" 
                            value={formData.bankAccount} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, bankAccount: true})}
                            className={getInputClass("bankAccount")} 
                            type="number" 
                            placeholder="Account Number" 
                          />
                          {showError("bankAccount")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">IFSC Code</span>
                          <input 
                            name="ifsc" 
                            value={formData.ifsc} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, ifsc: true})}
                            className={getInputClass("ifsc")} 
                            type="text" 
                            placeholder="SBINxxxxxx" 
                          />
                          {showError("ifsc")}
                        </span>
                        <span className="mb-[10PX]">
                          <span className="pb-5">Branch</span>
                          <input 
                            name="branch" 
                            value={formData.branch} 
                            onChange={handleChange} 
                            onBlur={() => setTouched({...touched, branch: true})}
                            className={getInputClass("branch")} 
                            type="text" 
                            placeholder="Branch xx" 
                          />
                          {showError("branch")}
                        </span>
                      </>
                    )}



                    </div>

                    <div className="buttonArea max-w-[600px] w-full h-[80px] flex flex-row justify-between items-center relative">

                      {step > 1 && 
                        <button 
                          onClick={() => setStep((prevStep) => prevStep - 1)}
                          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition absolute left-0">
                            Back
                        </button> 
                      }
                      {step < 4 && 
                        <button 
                        onClick={handleNextStep}
                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                          Next
                        </button>
                      }

                      {step == 4 && 
                        <button 
                        onClick={handleSubmit}
                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                          Submit
                        </button>
                      }
                        
                    </div>

              </div>
          </div>

        <div className="right w-[50%] h-full rounded-r-3xl flex items-center justify-center">
            <img className="w-full" src={bgImg} alt="bg"></img>
        </div>

        </div>
    </div>
  )
}