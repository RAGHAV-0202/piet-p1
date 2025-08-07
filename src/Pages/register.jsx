import { useState } from "react";
import React from "react";
import bgImg from "../assets/image.png"
import baseUrl from "../baseurl";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../CSS/responsive.css"

const Progress = (props) => {
  return (
    <div className="progress w-full overflow-x-auto md:overflow-visible h-auto md:h-[60px] flex flex-row justify-between border-b-[1px] pb-[10px] border-gray-300 mb-[32px]">
      <button onClick={() => { props.setStep(1) }} className="progress_indicator min-w-[80px] md:w-[20%] h-auto md:h-[50px] px-1 flex flex-col md:flex-row items-center justify-start md:justify-between gap-1">
        <div className={`flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-lg ${props.step == 1 ? "bg-blue-600" : "bg-zinc-400"}`}>
          <p className={`text-[16px] ${props.step == 1 ? "text-white" : "text-grey"}`}>1</p>
        </div>
        <p className="text-[12px] md:text-[14px] font-medium text-center md:text-left whitespace-nowrap">Login Details</p>
      </button>

      <button onClick={() => { props.setStep(2) }} className="progress_indicator min-w-[80px] md:w-[20%] h-auto md:h-[50px] px-1 flex flex-col md:flex-row items-center justify-start md:justify-between gap-1">
        <div className={`flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-lg ${props.step == 2 ? "bg-blue-600" : "bg-zinc-400"}`}>
          <p className={`text-[16px] ${props.step == 2 ? "text-white" : "text-grey"}`}>2</p>
        </div>
        <p className="text-[12px] md:text-[14px] font-medium text-center md:text-left whitespace-nowrap">Basic Details</p>
      </button>

      <button onClick={() => { props.setStep(3) }} className="progress_indicator min-w-[80px] md:w-[20%] h-auto md:h-[50px] px-1 flex flex-col md:flex-row items-center justify-start md:justify-between gap-1">
        <div className={`flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-lg ${props.step == 3 ? "bg-blue-600" : "bg-zinc-400"}`}>
          <p className={`text-[16px] ${props.step == 3 ? "text-white" : "text-grey"}`}>3</p>
        </div>
        <p className="text-[12px] md:text-[14px] font-medium text-center md:text-left whitespace-nowrap">More Details</p>
      </button>

      <button onClick={() => { props.setStep(4) }} className="progress_indicator min-w-[80px] md:w-[20%] h-auto md:h-[50px] px-1 flex flex-col md:flex-row items-center justify-start md:justify-between gap-1">
        <div className={`flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-lg ${props.step == 4 ? "bg-blue-600" : "bg-zinc-400"}`}>
          <p className={`text-[16px] ${props.step == 4 ? "text-white" : "text-grey"}`}>4</p>
        </div>
        <p className="text-[12px] md:text-[14px] font-medium text-center md:text-left whitespace-nowrap">Bank Details</p>
      </button>
    </div>
  )
}

const LoginNav = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get(`${baseUrl}api/auth/loggedIn`, { withCredentials: true }, { withCredentials: true })
        navigate("/dashboard")
      } catch (err) {
        console.log("error while checking if logged in")
        console.log(err)
      }
    }

    getUser()
  }, [])
  
  return (
    <div className="navbar shadow-2xl px-4 md:px-10 w-full h-[60px] flex items-center bg-white">
      <div className="logo h-auto w-auto md:w-[280px] flex flex-row items-center">
        <div className="h-[60px] flex items-center">
          <img className="h-[40px] md:h-[50px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo" />
        </div>
        <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-4 md:leading-5 pl-2 md:pl-5 text-[10px] md:text-[14px]">
          <span className="uppercase">panipat insitute of</span>
          <span className="uppercase">Engineering and</span>
          <span className="uppercase">technology</span>
        </div>
      </div>
    </div>
  )
}

const Info = (props) => {
  return (
    <div className="info w-full h-[80px] flex flex-col">
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
  const [apiError, setApiError] = React.useState("");
  const [formError, setFormError] = React.useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Mark field as touched
    setTouched({ ...touched, [e.target.name]: true });
    // Clear form-level errors when user makes changes
    setFormError("");
    setApiError("");
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
    } else if (name === "bankAccount" && !/^\d+$/.test(value)) {
      error = "Bank account must contain only numbers";
    } else if (name === "ifsc" && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      error = "Invalid IFSC code format";
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
      setFormError(""); // Clear form error when moving to next step
    } else {
      setFormError("Please fix the errors before proceeding");
    }
  };
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const isValid = validateStep(4);
    if (!isValid) {
      setFormError("Please fix the errors before submitting");
      return;
    }
    
    try {
      setApiError("");
      const response = await axios.post(baseUrl + "api/auth/register", formData, { withCredentials: true });
      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setApiError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.log("Error while registering");
      console.log(error);
      
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        setApiError("Network error. Please check your connection and try again.");
      }
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full mt-1 h-[2%] rounded-lg border-[1px] px-3 py-2 md:py-[1%]";
    // Only show error border if field has been touched and has an error
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500 bg-red-50`;
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

  return (
    <div className="register_page w-full h-full min-h-screen bg-[#EDEFFD] flex flex-col items-center overflow-x-hidden">
      <LoginNav />
      
      <div className="content w-screen min-h-[calc(100vh-60px)] h-full flex flex-row items-center justify-center flex-1 overflow-x-hidden">
        <div className="left w-full md:w-1/2 lg:max-w-[600px] min-h-[calc(100vh-70px)] h-full rounded-l-3xl flex flex-col gap-5 items-center justify-center p-4 md:p-8 overflow-x-hidden">
          <div className="form w-full h-auto">
            <Progress step={step} setStep={setStep} />
            <Info step={step} />
            
            {/* Form-level error message */}
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-medium">{formError}</p>
              </div>
            )}
            
            {/* API error message */}
            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-medium">{apiError}</p>
              </div>
            )}
            
            <div className="inputArea flex flex-col w-full h-auto">
              {step == 1 && (
                <>
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Full Name</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Email Address</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Set Password</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Confirm Password</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Joining Date</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Department</span>
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
                      <option value="PHARMACY">PHARMACY</option>
                      <option value="DCA">DCA</option>
                    </select>
                    {showError("department")}
                  </span>
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Designation</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Employee ID</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Scopus ID</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Vidwan ID</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Google Scholar ID</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">ORCID ID</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Bank Account Number</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">IFSC Code</span>
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
                  <span className="mb-[10px]">
                    <span className="pb-5 text-[14px] font-medium">Branch</span>
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

            <div className="buttonArea w-full h-[80px] flex flex-row justify-between items-center relative mt-6">
              {step > 1 && 
                <button 
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition absolute left-0">
                    Back
                </button> 
              }
              {step < 4 && 
                <button 
                onClick={handleNextStep}
                className="cursor-pointer inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                  Next
                </button>
              }
              {step == 4 && 
                <button 
                onClick={handleSubmit}
                className="cursor-pointer inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition absolute right-0">
                  Submit
                </button>
              }
            </div>
          </div>
        </div>

        {/* Image section - only visible on tablet and desktop */}
        <div className="right hidden md:flex w-1/2 h-full rounded-r-3xl items-center justify-center">
          <img className="w-full" src={bgImg} alt="bg" />
        </div>
      </div>
    </div>
  )
}

