import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";
import axios from "axios";
import baseUrl from "../baseurl.js";
import "../CSS/profile.css";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="bg bg-gray-200 animate-pulse flex w-full h-[200px] rounded-3xl overflow-hidden"></div>
      <div className="info p-10 flex flex1 w-full h-full flex-col">
        <div className="image overflow-hidden object-center mb-[50%] w-[200px] h-[200px] bg-gray-200 animate-pulse border-[10px] border-white rounded-[50%] absolute translate-y-[-70%]"></div>
        <div className="details pt-[80px]">
          <div className="py-5 h-10 w-72 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="py-5 h-6 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="moreDetails pt-10">
          {Array(9).fill(0).map((_, index) => (
            <div key={index} className="pb-6">
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="h-6 w-64 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const [user, setUser] = useState({ fullName: "Name Surname" });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token);

        const response = await axios.get(
          `${baseUrl}api/profile/profile`,
          {
            withCredentials: true,
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );

        setUser(response.data?.data);
        setEditData(response.data?.data);
      } catch (err) {
        console.log("error while getting profile", err);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(user);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(user);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateField = (name, value) => {
    let error = "";
    
    // Convert value to string and check if empty
    const stringValue = value ? String(value).trim() : "";
    
    if (!stringValue) {
      error = "This field is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(stringValue)) {
      error = "Invalid email address";
    } else if (name === "bankAccount" && !/^\d+$/.test(stringValue)) {
      error = "Bank account must contain only numbers";
    } else if (name === "ifsc" && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(stringValue.toUpperCase())) {
      error = "Invalid IFSC code format";
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = [
      "fullName", "email", "designation", "employeeId",
      "scopusId", "vidhwanId", "googleScholarId", "orcidId",
      "bankAccount", "ifsc", "branch"
    ];

    fieldsToValidate.forEach(field => {
      const error = validateField(field, editData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      setErrorMessage("Please fix all errors before saving");
      return;
    }

    setSaveLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.put(
        `${baseUrl}api/profile/update`,
        editData,
        {
          withCredentials: true,
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      if (response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.log("Error updating profile:", err);
      setErrorMessage(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-300`;
  };

  console.log(user);

  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <SideBar />
      <div className="content w-full h-full flex flex-col">
        <Navbar />
        <div className="areaContent flex w-full h-auto min-h-[calc(100vh-120px)] rounded-2xl flex-col items-center">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="bg bg-red-700 flex w-full h-[200px] rounded-[0] rounded-b-2xl overflow-hidden">
                <img className="w-full h-full" src="https://static.vecteezy.com/system/resources/previews/012/972/566/large_2x/color-meaning-of-color-variety-color-value-background-color-free-photo.jpg" alt="bg"></img>
              </div>
              <div className="info p-10 flex flex1 w-full h-full flex-col relative">
                <div className="image overflow-hidden object-center mb-[50%] w-[200px] h-[200px] bg-amber-200 border-[10px] border-white rounded-[50%] absolute translate-y-[-70%]">
                  <img className="w-full h-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user"></img>
                </div>

                {/* Edit/Save/Cancel Buttons */}
                <div className="absolute top-5 right-10 flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEditClick}
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
                        disabled={saveLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
                        disabled={saveLoading}
                      >
                        {saveLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </>
                  )}
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="details pt-[80px]">
                  {!isEditing ? (
                    <>
                      <h1 className="py-5 text-4xl font-bold leading-0">{user.fullName}</h1>
                      <h4 className="py-5 text-xl font-semibold leading-0 text-zinc-600">{user.designation}</h4>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={editData.fullName || ""}
                          onChange={handleInputChange}
                          className={getInputClass("fullName")}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={editData.designation || ""}
                          onChange={handleInputChange}
                          className={getInputClass("designation")}
                        />
                        {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="moreDetails pt-10">
                  {/* Email */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Email:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.email}</p>
                    ) : (
                      <>
                        <input
                          type="email"
                          name="email"
                          value={editData.email || ""}
                          onChange={handleInputChange}
                          className={getInputClass("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </>
                    )}
                  </div>

                  {/* Employee ID */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Employee ID:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.employeeId}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="employeeId"
                          value={editData.employeeId || ""}
                          onChange={handleInputChange}
                          className={getInputClass("employeeId")}
                        />
                        {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                      </>
                    )}
                  </div>

                  {/* Scopus ID */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Scopus ID:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.scopusId}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="scopusId"
                          value={editData.scopusId || ""}
                          onChange={handleInputChange}
                          className={getInputClass("scopusId")}
                        />
                        {errors.scopusId && <p className="text-red-500 text-xs mt-1">{errors.scopusId}</p>}
                      </>
                    )}
                  </div>

                  {/* Vidhwan ID */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Vidhwan ID:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.vidhwanId}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="vidhwanId"
                          value={editData.vidhwanId || ""}
                          onChange={handleInputChange}
                          className={getInputClass("vidhwanId")}
                        />
                        {errors.vidhwanId && <p className="text-red-500 text-xs mt-1">{errors.vidhwanId}</p>}
                      </>
                    )}
                  </div>

                  {/* Google Scholar */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Google Scholar:</span>
                    {!isEditing ? (
                      <a href={user.googleScholarId} className="text-blue-600 text-lg mt-1 block" target="_blank" rel="noopener noreferrer">Profile</a>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="googleScholarId"
                          value={editData.googleScholarId || ""}
                          onChange={handleInputChange}
                          className={getInputClass("googleScholarId")}
                          placeholder="Google Scholar URL"
                        />
                        {errors.googleScholarId && <p className="text-red-500 text-xs mt-1">{errors.googleScholarId}</p>}
                      </>
                    )}
                  </div>

                  {/* ORCID */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">ORCID:</span>
                    {!isEditing ? (
                      <a href={user.orcidId} className="text-blue-600 text-lg mt-1 block" target="_blank" rel="noopener noreferrer">Profile</a>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="orcidId"
                          value={editData.orcidId || ""}
                          onChange={handleInputChange}
                          className={getInputClass("orcidId")}
                          placeholder="ORCID URL"
                        />
                        {errors.orcidId && <p className="text-red-500 text-xs mt-1">{errors.orcidId}</p>}
                      </>
                    )}
                  </div>

                  {/* Bank Account */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Bank Account:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.bankAccount}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="bankAccount"
                          value={editData.bankAccount || ""}
                          onChange={handleInputChange}
                          className={getInputClass("bankAccount")}
                        />
                        {errors.bankAccount && <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>}
                      </>
                    )}
                  </div>

                  {/* IFSC Code */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">IFSC Code:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.ifsc}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="ifsc"
                          value={editData.ifsc || ""}
                          onChange={handleInputChange}
                          className={getInputClass("ifsc")}
                        />
                        {errors.ifsc && <p className="text-red-500 text-xs mt-1">{errors.ifsc}</p>}
                      </>
                    )}
                  </div>

                  {/* Branch */}
                  <div className="pb-6">
                    <span className="font-bold text-lg text-zinc-500">Branch:</span>
                    {!isEditing ? (
                      <p className="text-lg mt-1">{user.branch}</p>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="branch"
                          value={editData.branch || ""}
                          onChange={handleInputChange}
                          className={getInputClass("branch")}
                        />
                        {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
