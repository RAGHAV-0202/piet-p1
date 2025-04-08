import React from "react";
import Navbar from "../Components/navbar";
import SideBar from "../Components/sidebar";
import axios from "axios";
import baseUrl from "../baseurl";
import "../CSS/claim.css";

const Heading = () => {
  return (
    <div className="w-full h-[100px] flex pt-5 pb-5 flex-col">
      <h3 className="font-bold text-2xl">Details for Submission</h3>
      <h6 className="font-semibold text-[14px] text-gray-500">
        Fill all the details for the submission
      </h6>
    </div>
  );
};

const ClaimBox2 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [authors, setAuthors] = React.useState(1);
  const [authorNames, setAuthorNames] = React.useState(Array(7).fill(""));
  const [authorAffiliation, setAffiliation] = React.useState(Array(7).fill(""));
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

  // Determine if this is a Patent submission with faculty restriction
  const isPatent = category === "Publication Patent";
  const isConference = category === "Conference";
  const isProfessionalBody = category === "Professional Body Membership";

  // Helper function to clear form
  function clear() {
    setAuthors(1);
    setAuthorNames(Array(7).fill(""));
    setAffiliation(Array(7).fill(""));
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

    // Reset authors based on category rules
    if (newCategory === "Publication Patent" && newIncentive === 6000) {
      // For 1-2 faculty patent submission, default to 1 author
      setAuthors(1);
    } else if (newCategory === "Publication Patent" && newIncentive === 15000) {
      // For >2 faculty patent submission, default to 3 authors
      setAuthors(3);
    } else if (newCategory === "Conference" || newCategory === "Professional Body Membership") {
      // For Conference or Professional Body, no authors needed
      setAuthors(1);
    }
  };

  // Handle author count changes with validation for patent submissions
  const handleNumberAuthors = (e) => {
    const newAuthorCount = parseInt(e.target.value);
    
    // Enforce patent-specific author restrictions
    if (category === "Publication Patent" && incentive === 6000) {
      // For Patent with 1-2 faculty
      if (newAuthorCount > 2) {
        alert("For Publication Patent with 1-2 faculty, maximum of 2 authors is allowed.");
        return;
      }
    } else if (category === "Publication Patent" && incentive === 15000) {
      // For Patent with >2 faculty
      if (newAuthorCount < 3) {
        alert("For Publication Patent with more than 2 faculty, minimum of 3 authors is required.");
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
    if (!isConference && !isProfessionalBody) {
        formData.append("numberOfAuthors", authors);
        formData.append("webLink", webLink);
        formData.append("calculatedAmount", (incentive / authors).toFixed(0));
        
        // Append author data
        authorNames.slice(0, authors).forEach((name, index) => {
        formData.append(`authors[${index}]`, name);
        });

        authorAffiliation.slice(0, authors).forEach((affiliation, index) => {
        formData.append(`authorAffiliation[${index}]`, affiliation);
        });
        
        formData.append("paperFront", paperFront);
    } else if (isConference) {
        // For conference, send a placeholder for authors
        formData.append("numberOfAuthors", 1);
        formData.append("authors[0]", "NA");
        formData.append("authorAffiliation[0]", "NA");
        formData.append("calculatedAmount", incentive);
        formData.append("webLink", "NA");
    } else if (isProfessionalBody) {
        // For professional body, send minimal data
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
        for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }
        const response = await axios.post(
        `${baseUrl}api/form/claim`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
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

  const errorClass = "border-red-500";

  return (
    <div className="claimBox flex w-full h-full rounded-2xl p-5 flex-col items-center">
      <h1 className="text-xl font-bold pb-10">Enter Details for Claim</h1>

      <div className="areaForDetails w-full bg-white py-10 rounded-3xl px-10 max-w-[800px] flex flex-col">
        <span className="mb-5">
          <p>
            Category of submission <span className="text-red-600">*</span>
          </p>
          <select
            onChange={handleCategory}
            defaultValue={"SCIE / WOS / ESCI,10000"}
            className="w-full border h-12 rounded-sm max-w-[400px] px-6 flex items-center"
            disabled={isLoading}
          >
            <option value={"SCIE / WOS / ESCI,10000"}>
              SCIE / WOS / ESCI (10000)
            </option>
            <option value={"ESCI SCOPUS,5000"}>ESCI SCOPUS (5000)</option>
            <option value={"Book Chapter international,5000"}>
              Book Chapter International (5000)
            </option>
            <option value={"Book Chapter national,3000"}>
              Book Chapter National (3000)
            </option>
            <option value={"UGC,3500"}>UGC (3500)</option>
            <option value={"PUBLICATION,15000"}>Publication (15000)</option>
            <option value={"Book International,10000"}>
              Book International (10000)
            </option>
            <option value={"Book National,7500"}>Book National (7500)</option>
            <option value={"Publication Patent,6000"}>
              Publication Patent (6000) (1 or 2 PIET Faculty)
            </option>
            <option value={"Publication Patent,15000"}>
              Publication Patent (15000) (More than 2 PIET Faculty)
            </option>
            <option value={"Conference,2000"}>Conference (2000)</option>
            <option value={"Professional Body Membership,0"}>
              Professional Body Membership
            </option>
          </select>
        </span>

        {/* Title field with conditional label */}
        {(!isProfessionalBody) && (
          <span className="mb-5">
            <span className="pb-4">
              {isConference ? "Title of the conference" : "Title of the research paper"}
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${
                errors.title ? errorClass : ""
              }`}
              type="text"
              placeholder={isConference ? "Conference Title" : "Paper Title"}
              disabled={isLoading}
            />
          </span>
        )}

        {/* Authors section - only show for non-conference and non-professional body submissions */}
        {!isConference && !isProfessionalBody && (
          <>
            <span className="mb-5">
              <p>
                Number of Authors <span className="text-red-600">*</span>
              </p>
              <select
                onChange={handleNumberAuthors}
                value={authors}
                className="w-full border h-12 rounded-sm max-w-[400px] px-6 flex items-center"
                disabled={isLoading}
              >
                {/* For Patent 1-2 faculty, restrict to 1-2 authors */}
                {isPatent && incentive === 6000
                  ? [1, 2].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))
                  : isPatent && incentive === 15000
                  ? /* For Patent >2 faculty, minimum 3 authors */
                    [3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))
                  : /* For other submission types, 1-7 authors */
                    [...Array(7)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
              </select>
            </span>

            <div className="w-full flex flex-wrap ml-5 mb-5">
              {[...Array(authors)].map((_, index) => (
                <span key={index} className="mb-2 mr-10">
                  <p>
                    Author {index + 1} <span className="text-red-600">*</span>
                  </p>
                  <div className="flex flex-row w-full gap-10">
                    <input
                      value={authorNames[index]}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${
                        errors[`author${index}`] ? errorClass : ""
                      }`}
                      type="text"
                      placeholder="Author's Name"
                      disabled={isLoading}
                    />
                    <input
                      value={authorAffiliation[index]}
                      onChange={(e) =>
                        handleAuthorAffiliationChange(index, e.target.value)
                      }
                      className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${
                        errors[`affiliation${index}`] ? errorClass : ""
                      }`}
                      type="text"
                      placeholder="Author's Affiliation"
                      disabled={isLoading}
                    />
                  </div>
                </span>
              ))}
            </div>
          </>
        )}
    
        {!isProfessionalBody && (
        <span className="mb-5">
            <p className="font-medium text-[14px]">
            Proof of Claim<span className="text-red-600">*</span>
            </p>
            <label
            htmlFor="claimProofUpload"
            className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            >
            Upload PDF
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
            <p className="mt-2 text-green-600 font-medium">
                Uploaded: {claimProof.name}
            </p>
            )}
        </span>
        )}

        {/* Date field with conditional label */}
        {!isProfessionalBody && (
          <span className="mb-5">
            <p>
              {isConference ? "Date of Event" : "Date of Publication"}{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${
                errors.publicationDate ? errorClass : ""
              }`}
              type="date"
              disabled={isLoading}
            />
          </span>
        )}

        {/* Web link - only for non-conference and non-professional body submissions */}
        {!isConference && !isProfessionalBody && (
          <span className="mb-5">
            <p>
              Web link of research document <span className="text-red-600">*</span>
            </p>
            <input
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
              className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${
                errors.webLink ? errorClass : ""
              }`}
              type="text"
              placeholder="Link"
              disabled={isLoading}
            />
          </span>
        )}

        {/* Venue field - only for non-professional body submissions */}
        {!isProfessionalBody && (
          <span className="mb-5">
            <p>
              Venue for {isConference ? "Conference" : "Paper"}{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${
                errors.venue ? errorClass : ""
              }`}
              type="text"
              placeholder="Venue"
              disabled={isLoading}
            />
          </span>
        )}

        {/* Paper Front - only for non-conference and non-professional body submissions */}
        {!isConference && !isProfessionalBody && (
          <span className="mb-5">
            <p className="font-medium text-[14px]">
              Research Paper Front <span className="text-red-600">*</span>
            </p>
            <label
              htmlFor="paperFrontUpload"
              className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Upload PDF
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
              <p className="mt-2 text-green-600 font-medium">
                Uploaded: {paperFront.name}
              </p>
            )}
          </span>
        )}

        {/* Proof of Claim - only for non-conference and non-professional body submissions */}
        {!isConference && !isProfessionalBody && (
          <span className="mb-5">
            <p className="font-medium text-[14px]">
              Proof of Claim<span className="text-red-600">*</span>
            </p>
            <label
              htmlFor="claimProofUpload"
              className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Upload PDF
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
              <p className="mt-2 text-green-600 font-medium">
                Uploaded: {claimProof.name}
              </p>
            )}
          </span>
        )}

        {/* Calculated amount - not shown for professional body */}
        {!isProfessionalBody && (
          <span className="mb-5">
            <p className="font-medium">
              Calculated Amount:{" "}
              {isConference
                ? incentive
                : (incentive / authors).toFixed(0)}{" "}
              Rs.
            </p>
          </span>
        )}

        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleSubmit}
            type="button"
            className={`w-[200px] h-[40px] cursor-pointer flex items-center justify-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Claim = () => {
  return (
    <div className="claim h-full w-full flex pr-5 pb-10 ">
      <SideBar />
      <div className="content flex flex-col w-full">
        <Navbar />
        <div className="areaContentClaim bg-[#EDEFFD] flex w-full h-full py-[20px] px-[20px] min-h-[calc(100vh-120px)] rounded-2xl mt-5 shadow-2xs flex-col">
          <ClaimBox2 />
        </div>
      </div>
    </div>
  );
};

export default Claim;