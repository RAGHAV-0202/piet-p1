import { useState } from "react";
import React from "react";
import "../CSS/responsive.css";
import bgImg from "../assets/image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseurl";

const LoginNav = () => {
    const navigate = useNavigate()

    React.useEffect(()=>{
        const getUser = async()=>{
            try{
                const data = await axios.get(`${baseUrl}api/admin/login` , { withCredentials: true } , { withCredentials: true })
                // console.log(response)
                const accessToken = data.data.accessToken 
                localStorage.setItem("adminAccessToken" , accessToken)
                navigate("/admin/dashboard")
            }catch(err){
                console.log("error while checking if logged in")
                console.log(err)

                navigate("/admin/login")
            }
        }

        getUser()

        
    } , [])

  return (
    <div className="navbar shadow-md px-10 w-full h-[60px] flex items-center bg-white">
      <div className="logo flex items-center">
        <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo" />
        <div className="branding pl-5 text-lg font-semibold leading-5">
          <span className="uppercase block">Panipat Institute of</span>
          <span className="uppercase block">Engineering and</span>
          <span className="uppercase block">Technology</span>
        </div>
      </div>
    </div>
  );
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when typing
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    if (!value.trim()) {
      newErrors[name] = "This field is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[name] = "Please enter a valid email address";
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    let newTouched = { email: true, password: true };
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
    setTouched(newTouched);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Clear any previous API errors
    setApiError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(baseUrl + "api/admin/login", formData, { 
        withCredentials: true 
      });
      
      if (response.data.success) {
        // Successfully logged in
        const accessToken = response.data.data ? response.data.data.accessToken : response.data.accessToken;
        if (accessToken) {
          localStorage.setItem("adminAccessToken" , accessToken);
        }
        navigate("/admin/dashboard");
      } else {
        // Server returned a success:false response
        setApiError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle error response from server
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setApiError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full mt-1 p-2 rounded-lg border";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500`;
    }
    return `${baseClass} border-blue-400`;
  };

  return (
    <div className="register_page w-full min-h-screen bg-[#EDEFFD] flex flex-col items-center overflow-hidden">
      <LoginNav />
      <div className="content w-full min-h-[calc(100vh-60px)] flex flex-row items-center justify-center flex-1">
        <div className="left w-[50%] min-h-[calc(100vh-70px)] flex flex-col gap-5 items-center justify-center">
          <div className="form w-full max-w-[500px]">
            <h1 className="font-bold text-xl pb-6">Admin Login</h1>
            
            {/* Show API error message if exists */}
            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{apiError}</p>
              </div>
            )}
            
            <div className="inputArea flex flex-col w-full gap-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={getInputClass("email")} 
                  type="email" 
                  placeholder="jon@domain.com" 
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Enter Password</label>
                <input 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  className={getInputClass("password")} 
                  type="password" 
                  placeholder="Enter Password" 
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="buttonArea w-full flex justify-end mt-5">
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className={`px-5 py-2 ${isSubmitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} text-white font-medium rounded-md transition`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            {/* <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
              </p>
            </div> */}
          </div>
        </div>
        <div className="right w-[50%] h-full flex items-center justify-center">
          <img className="w-full max-w-[600px]" src={bgImg} alt="background" />
        </div>
      </div>
    </div>
  );
}