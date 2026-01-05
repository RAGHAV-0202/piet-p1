import React from "react";
import Navbar from "../Components/navbar";
import SideBar from "../Components/sidebar";
import axios from "axios";
import baseUrl from "../baseurl";
import "../CSS/claim.css";

const Heading = () => {
  return (
    <div className="w-full flex pt-8 pb-6 flex-col">
      <h1 className="font-bold text-4xl text-gray-900 mb-2">Submit Your Claim</h1>
      <p className="text-lg text-gray-600 font-medium">
        Fill in the details below to submit your research claim
      </p>
    </div>
  );
};

const ClaimBox2 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [authors, setAuthors] = React.useState(1);
  const [authorNames, setAuthorNames] = React.useState(Array(9).fill(""));
  const [authorAffiliation, setAffiliation] = React.useState(Array(9).fill(""));
  const [category, setCategory] = React.useState("SCIE / WOS / ESCI");
  const [categoryValue, setCategoryValue] = React.useState("SCIE / WOS / ESCI");
  const [incentive, setIncentive] = React.useState(10000);
  const [title, setTitle] = React.useState("");
  const [publicationDate, setPublicationDate] = React.useState("");
  const [webLink, setWebLink] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [paperFront, setPaperFront] = React.useState(null);
  const [claimProof, setClaimProof] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [pietFacultyCount, setPietFacultyCount] = React.useState(1);
  const [showPietFacultySelection, setShowPietFacultySelection] = React.useState(false);
  const [totalAuthors, setTotalAuthors] = React.useState(1);
  const [pietFacultyNames, setPietFacultyNames] = React.useState(['', '']); 

  // Determine if this is a Patent submission with faculty restriction
  const isPatent = category === "Publication Patent";
  const isConference = category === "Conference";
  const isProfessionalBody = category === "Professional Body Membership";

  // Helper function to clear form
  function clear() {
    setAuthors(1);
    setAuthorNames(Array(9).fill(""));
    setAffiliation(Array(9).fill(""));
    setPietFacultyNames(['', '']); // Clear PIET faculty names
    setCategory("SCIE / WOS / ESCI");
    setCategoryValue("SCIE / WOS / ESCI");
    setIncentive(10000);
    setTitle("");
    setPublicationDate("");
    setWebLink("");
    setVenue("");
    setPaperFront(null);
    setClaimProof(null);
  }

  // Handle category change with special logic for patent submissions
  const handleCategory = (e) => {
    const raw = e.target.value;
    const arr = raw.split(",");

    const newCategory = arr[0];
    const newIncentive = parseInt(arr[1]);
    
    setCategoryValue(newCategory);
    setCategory(newCategory);
    setIncentive(newIncentive);

    // Show PIET faculty selection for 6000 patent option
    if (newCategory === "Publication Patent" && newIncentive === 6000) {
      setShowPietFacultySelection(true);
      setAuthors(1);
      setPietFacultyCount(1); // Reset to default
    } else {
      setShowPietFacultySelection(false);
      if (newCategory === "Publication Patent" && newIncentive === 15000) {
        setAuthors(3);
      } else if (newCategory === "Conference" || newCategory === "Professional Body Membership") {
        setAuthors(1);
      }
    }
  };

  const handlePietFacultyChange = (e) => {
    const facultyCount = parseInt(e.target.value);
    setPietFacultyCount(facultyCount);
    
    // Set minimum authors based on PIET faculty count
    if (facultyCount === 1) {
      setAuthors(Math.max(1, authors)); // Ensure at least 1 author
    } else if (facultyCount === 2) {
      setAuthors(Math.max(2, authors)); // Ensure at least 2 authors
    }
  };

  const handlePietFacultyNameChange = (index, value) => {
    const updatedNames = [...pietFacultyNames];
    updatedNames[index] = value;
    setPietFacultyNames(updatedNames);
  };

  // Handle author count changes with validation for patent submissions
const handleNumberAuthors = (e) => {
  const newAuthorCount = parseInt(e.target.value);
  
  // Enforce patent-specific author restrictions
  if (category === "Publication Patent" && incentive === 6000) {
    // For Patent with PIET faculty, check minimum requirements
    if (newAuthorCount < pietFacultyCount) {
      alert(`For Publication Patent with ${pietFacultyCount} PIET faculty, minimum of ${pietFacultyCount} authors is required.`);
      return;
    }
  } else if (category === "Publication Patent" && incentive === 15000) {
    // For Patent with >2 faculty
    if (newAuthorCount < 3) {
      alert("For Publication Patent with more than 2 faculty, minimum of 3 authors is required.");
      return;
    }
  } else if (category === "Conference") {
    // For Conference, maximum 9 authors
    if (newAuthorCount > 9) {
      alert("For Conference submissions, maximum of 9 authors is allowed.");
      return;
    }
  }

  setAuthors(newAuthorCount);
};

  const handleAuthorAffiliationChange = (index, value) => {
    const updatedAffiliation = [...authorAffiliation];
    updatedAffiliation[index] = value;
    setAffiliation(updatedAffiliation);
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...authorNames];
    updatedAuthors[index] = value;
    setAuthorNames(updatedAuthors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaperFront(file);
      console.log(file.name);
    }
  };

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClaimProof(file);
      console.log(file.name);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Skip validation for fields that aren't shown based on category
    if (!isProfessionalBody && !isConference) {
        if (!title.trim()) newErrors.title = true;
    }
    
    if (!isProfessionalBody) {
        if (!publicationDate) newErrors.publicationDate = true;
        if (!venue.trim()) newErrors.venue = true;
        
        if (!isConference) {
        if (!webLink.trim()) newErrors.webLink = true;
        if (!paperFront || !(paperFront instanceof File)) newErrors.paperFront = true;
        }
    }
    
    // Validate claim proof for both conference and research papers (not for professional body)
    if (!isProfessionalBody) {
        if (!claimProof || !(claimProof instanceof File)) newErrors.claimProof = true;
    }

    if (!isProfessionalBody) {
    authorNames.slice(0, authors).forEach((name, index) => {
      if (!name.trim()) {
        newErrors[`author${index}`] = true;
      }
    });

    authorAffiliation.slice(0, authors).forEach((aff, index) => {
      if (!aff.trim()) {
        newErrors[`affiliation${index}`] = true;
      }
    });
  }


    // Validate authors only if they should be displayed
    if (!isConference && !isProfessionalBody) {
        authorNames.slice(0, authors).forEach((name, index) => {
        if (!name.trim()) {
            newErrors[`author${index}`] = true;
        }
        });

        authorAffiliation.slice(0, authors).forEach((aff, index) => {
        if (!aff.trim()) {
            newErrors[`affiliation${index}`] = true;
        }
        });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        alert("Please fill all required fields.");
        return;
    }

    setIsLoading(true);
    
    const formData = new FormData();

    // Common fields for all submission types
    formData.append("category", category);
    formData.append("totalAmount", incentive);
    
    // Fields that vary by submission type
    if (!isProfessionalBody) {
        if (isConference) {
        formData.append("title", title); // Title of Conference
        } else {
        formData.append("title", title); // Title of Research Paper
        }
        
        formData.append("venue", venue);
        formData.append("publicationDate", publicationDate);
    }
    
    // Add claim proof for both conference and regular submissions (not for professional body)
    if (!isProfessionalBody) {
      formData.append("claimProof", claimProof);
    }
    
    // Fields only for non-conference, non-professional body submissions
    if (!isProfessionalBody) {
      formData.append("numberOfAuthors", authors);
      
      // Append author data for both regular and conference submissions
      authorNames.slice(0, authors).forEach((name, index) => {
        formData.append(`authors[${index}]`, name);
      });

      authorAffiliation.slice(0, authors).forEach((affiliation, index) => {
        formData.append(`authorAffiliation[${index}]`, affiliation);
      });
      
      if (isConference) {
        formData.append("calculatedAmount", (incentive / authors).toFixed(0));
        formData.append("webLink", "NA");
      } else {
        formData.append("webLink", webLink);
        formData.append("calculatedAmount", (incentive / authors).toFixed(0));
        formData.append("paperFront", paperFront);
      }
    } else if (isProfessionalBody) {
      // Professional body remains the same
      formData.append("title", "Professional Body Membership");
      formData.append("numberOfAuthors", 1);
      formData.append("authors[0]", "NA");
      formData.append("authorAffiliation[0]", "NA");
      formData.append("calculatedAmount", incentive);
      formData.append("webLink", "NA");
      formData.append("publicationDate", "2000-01-01");
      formData.append("venue", "NA");
    }

    try {
        // Log FormData contents (add this right before the axios.post call)
        console.log("FormData contents:");
        const token = localStorage.getItem("accessToken");
        for (let [key, value] of formData.entries()) {
           console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }
        const response = await axios.post(
        `${baseUrl}api/form/claim`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data"  ,  Authorization: `Bearer ${token}` },
            withCredentials: true, // Send authentication cookies
        }
        );
        clear();
        console.log("Claim submitted successfully:", response.data);
        alert("Claim submitted successfully!");
    } catch (error) {
        console.error(
        "Error submitting claim:",
        error.response?.data || error.message
        );
        alert(error.response?.data?.message || "Failed to submit claim");
    } finally {
        setIsLoading(false);
    }
  };

  const errorClass = "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200";
  const normalClass = "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-4xl mx-auto px-6 py-8">
        {/* <Heading /> */}
        
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-sm">
          {/* Header Section */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-3xl">
            <h2 className="text-2xl font-bold text-white">Claim Details</h2>
            <p className="text-blue-100 mt-1">Please provide accurate information for your submission</p>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Category Selection */}
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Category of Submission
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                onChange={handleCategory}
                defaultValue={"SCIE / WOS / ESCI,10000"}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${normalClass} hover:border-blue-300`}
                disabled={isLoading}
              >
                <option value={"SCIE / WOS / ESCI,10000"}>(A*) SCIE / WOS / ESCI (₹10,000)</option>
                <option value={"ESCI SCOPUS,5000"}>(A) ESCI SCOPUS (₹5,000)</option>
                <option value={"Book Chapter international,5000"}>Book Chapter International (₹5,000)</option>
                <option value={"Book Chapter national,3000"}>Book Chapter National (₹3,000)</option>
                <option value={"UGC,3500"}>(BC) UGC (₹3,500)</option>
                {/* <option value={"PUBLICATION,15000"}>Publication (₹15,000)</option> */}
                <option value={"Book International,10000"}>Book International (₹10,000)</option>
                <option value={"Book National,7500"}>Book National (₹7,500)</option>
                <option value={"Publication Patent,6000"}>Publication Patent (₹6,000) - 1 or 2 PIET Faculty</option>
                <option value={"Publication Patent,15000"}>Publication Patent (₹15,000) - More than 2 PIET Faculty</option>
                <option value={"Conference,2000"}>Conference (₹2,000)</option>
                <option value={"Professional Body Membership,0"}>Professional Body Membership</option>
              </select>
            </div>

            {/* Title Field */}
            {(!isProfessionalBody) && (
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {isConference ? "Title of the Conference / Jornal" : "Title of the Research Paper / Patent"}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${
                    errors.title ? errorClass : normalClass
                  } hover:border-blue-300`}
                  type="text"
                  placeholder={isConference ? "Enter conference title..." : "Enter research paper title..."}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Authors Section */}
            {!isProfessionalBody && (
              <>
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Number of Authors
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    onChange={handleNumberAuthors}
                    value={authors}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${normalClass} hover:border-blue-300`}
                    disabled={isLoading}
                  >
                    {/* For Patent 1-2 faculty, restrict to 1-2 authors */}
                    {isPatent && incentive === 6000
                      ? [1, 2,3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <option key={num} value={num}>
                            {num} Author{num > 1 ? 's' : ''}
                          </option>
                        ))
                      : isPatent && incentive === 15000
                      ? /* For Patent >2 faculty, minimum 3 authors */
                        [3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <option key={num} value={num}>
                            {num} Authors
                          </option>
                        ))
                      : isConference
                      ? /* For Conference, 1-9 authors */
                        [...Array(9)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1} Author{index > 0 ? 's' : ''}
                          </option>
                        ))
                      : /* For other submission types, 1-9 authors */
                        [...Array(9)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1} Author{index > 0 ? 's' : ''}
                          </option>
                        ))}
                  </select>
                </div>

              {showPietFacultySelection && (
                <div className="space-y-6">
                  {/* PIET Faculty Count Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      Number of PIET Faculty
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      onChange={handlePietFacultyChange}
                      value={pietFacultyCount}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${normalClass} hover:border-blue-300`}
                      disabled={isLoading}
                    >
                      <option value={1}>1 PIET Faculty</option>
                      <option value={2}>2 PIET Faculty</option>
                    </select>
                  </div>

                  {/* PIET Faculty Names */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                      <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                      PIET Faculty Details
                    </h3>
                    <div className="space-y-4">
                      {[...Array(pietFacultyCount)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PIET Faculty {index + 1} Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={pietFacultyNames[index]}
                            onChange={(e) => handlePietFacultyNameChange(index, e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                              errors[`pietFaculty${index}`] ? errorClass : normalClass
                            }`}
                            type="text"
                            placeholder="Enter PIET faculty name"
                            disabled={isLoading}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Information Note */}
                  <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p><strong>Note:</strong> You can add outsiders as additional authors. Total amount (₹6,000) will be divided equally among all {authors} authors.</p>
                    <p className="mt-2"><strong>Requirement:</strong> Total authors ({authors}) must be at least equal to PIET faculty count ({pietFacultyCount}).</p>
                  </div>
                </div>
              )}

                {/* Author Details - now shows for conferences too */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                    Author Details
                  </h3>
                  <div className="grid gap-6">
                    {[...Array(authors)].map((_, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h4 className="text-md font-semibold text-gray-700 mb-4">
                          Author {index + 1}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              value={authorNames[index]}
                              onChange={(e) => handleAuthorChange(index, e.target.value)}
                              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                errors[`author${index}`] ? errorClass : normalClass
                              }`}
                              type="text"
                              placeholder="Enter author's full name"
                              disabled={isLoading}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Affiliation <span className="text-red-500">*</span>
                            </label>
                            <input
                              value={authorAffiliation[index]}
                              onChange={(e) => handleAuthorAffiliationChange(index, e.target.value)}
                              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                errors[`affiliation${index}`] ? errorClass : normalClass
                              }`}
                              type="text"
                              placeholder="Enter institution/organization"
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Date Field */}
            {!isProfessionalBody && (
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Date of the event
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${
                    errors.publicationDate ? errorClass : normalClass
                  } hover:border-blue-300`}
                  type="date"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Web Link */}
            {!isConference && !isProfessionalBody && (
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                  Web Link of Research Document
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={webLink}
                  onChange={(e) => setWebLink(e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${
                    errors.webLink ? errorClass : normalClass
                  } hover:border-blue-300`}
                  type="url"
                  placeholder="https://example.com/your-research-paper"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Venue Field */}
            {!isProfessionalBody && (
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Venue for {isConference ? "Conference" : "Paper"}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium focus:outline-none focus:ring-4 ${
                    errors.venue ? errorClass : normalClass
                  } hover:border-blue-300`}
                  type="text"
                  placeholder="Enter venue name or journal name"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* File Upload Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Paper Front - only for non-conference and non-professional body submissions */}
              {!isConference && !isProfessionalBody && (
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Research Paper Front
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 hover:border-blue-400 ${
                    errors.paperFront ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <label
                      htmlFor="paperFrontUpload"
                      className={`cursor-pointer flex flex-col items-center space-y-3 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Upload PDF</p>
                        <p className="text-xs text-gray-500">Research paper front page</p>
                      </div>
                      <input
                        id="paperFrontUpload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                    {paperFront && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {paperFront.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Proof of Claim */}
              {!isProfessionalBody && (
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Proof of Claim
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 hover:border-blue-400 ${
                    errors.claimProof ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <label
                      htmlFor="claimProofUpload"
                      className={`cursor-pointer flex flex-col items-center space-y-3 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Upload PDF</p>
                        <p className="text-xs text-gray-500">Supporting documents</p>
                      </div>
                      <input
                        id="claimProofUpload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleProofChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                    {claimProof && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {claimProof.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Calculated Amount */}
            {!isProfessionalBody && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-800">Calculated Amount</h3>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(incentive / authors).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    {/* Show breakdown for 6000 patent */}
                    {category === "Publication Patent" && incentive === 6000 && (
                      <p className="text-sm text-green-700 mt-1">
                        Total: ₹{incentive.toLocaleString()} ÷ {authors} authors
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}


            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                type="button"
                className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                  isLoading 
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <svg
                      className="animate-spin w-6 h-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting your claim...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Submit Claim</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Claim = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <ClaimBox2 />
        </div>
      </div>
    </div>
  );
};

export default Claim;

