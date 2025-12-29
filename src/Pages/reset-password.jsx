import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseurl";
import React from "react"

const LoginNav = () => {
    const navigate = useNavigate()

    React.useEffect(()=>{
        const getUser = async()=>{
            try{
                await axios.get(`${baseUrl}api/auth/loggedIn` , { withCredentials: true } , { withCredentials: true })
                navigate("/dashboard")
            }catch(err){
                console.log("error while checking if logged in")
                console.log(err)

                // navigate("/login")
            }
        }

        getUser()

        
    } , [])

  return (
    <div className="navbar shadow-md px-4 md:px-10 w-full h-[60px] flex items-center bg-white">
      <div className="logo flex items-center">
        <img className="h-[40px] md:h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo" />
        <div className="branding pl-2 md:pl-5 text-sm md:text-lg font-semibold leading-4 md:leading-5">
          <span className="uppercase block">Panipat Institute of</span>
          <span className="uppercase block">Engineering and</span>
          <span className="uppercase block">Technology</span>
        </div>
      </div>
    </div>
  );
};

export default function ResetPassword() {
  const { token } = useParams(); // 🔑 JWT token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const validate = () => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";
    if (password !== confirmPassword)
      return "Passwords do not match";
    return "";
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${baseUrl}api/auth/reset/${token}`,
        {
          password,
        }
      );

      if (response.data.success) {
        setSuccess("Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message || "Reset failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Reset link expired or invalid"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register_page w-full min-h-screen bg-[#EDEFFD] flex flex-col items-center">
      <LoginNav />

      <div className="w-full flex justify-center items-center flex-1 px-4">
        <div className="w-full max-w-[420px] bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold mb-4">Reset Password</h1>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={`w-full mt-1 p-2 rounded-lg border ${
                touched.password && password.length < 6
                  ? "border-red-500"
                  : "border-blue-400"
              }`}
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched({ ...touched, confirmPassword: true })
              }
              className={`w-full mt-1 p-2 rounded-lg border ${
                touched.confirmPassword &&
                password !== confirmPassword
                  ? "border-red-500"
                  : "border-blue-400"
              }`}
              placeholder="Confirm password"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-5 py-2 ${
                isSubmitting
                  ? "bg-gray-500"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-medium rounded-md transition`}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
