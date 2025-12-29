import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";
import baseUrl from "../baseurl.js";

const UserWelcome = ({ name, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-[100px] flex pt-5 pb-5 flex-col">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[100px] flex pt-5 pb-5 flex-col">
      <h3 className="font-bold text-2xl">Hello, {name}</h3>
      <h6 className="font-semibold text-[14px] text-gray-500">
        Here are your all submissions.
      </h6>
    </div>
  );
};

const Claim = ({ _id, title, authors, publicationDate, venue, webLink, category, calculatedAmount, claimProof, paperFront, createdAt, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate if claim can be deleted (within 7 days)
  const canDelete = () => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const isDeletable = canDelete();
  const daysLeft = () => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(7 - diffInDays));
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.post(`${baseUrl}api/form/claim/${_id}`, {}, { withCredentials: true });
      onDelete(_id);
      setShowConfirm(false);
    } catch (err) {
      console.error("Error deleting claim:", err);
      alert("Failed to delete claim. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500 relative">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">📅 Published on: {publicationDate || "N/A"}</p>
      <p className="text-sm text-gray-600">🏛 Venue: {venue || "N/A"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors: {authors.length ? authors.join(", ") : "NA"}</p>
      <p className="text-sm text-gray-600">📂 Category: {category}</p>
      <p className="text-sm text-gray-600">💰 Incentive: ₹{calculatedAmount}</p>

      {(claimProof || paperFront) && 
        <div className="flex flex-row gap-4 mt-4">
          {paperFront && paperFront !== "NA" && 
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">📄 Paper Front:</p>
              <div className="flex flex-col sm:flex-row gap-2 items-start">
                <div className="flex flex-col gap-2">
                  <a 
                    href={paperFront} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-blue-600 transition w-30"
                  >
                    👁️ View
                  </a>
                </div>
              </div>
            </div>
          }
          {claimProof && 
            <div>
              <p className="text-sm font-semibold mb-2">📑 Claim Proof:</p>
              <div className="flex flex-col sm:flex-row gap-2 items-start">
                <div className="flex flex-col gap-2">
                  <a 
                    href={claimProof}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-blue-600 transition w-30"
                  >
                    👁️ View
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!isDeletable}
          className={`px-4 py-2 rounded-md text-sm transition ${
            isDeletable
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🗑️ Delete Submission
        </button>
        {!isDeletable && (
          <p className="text-xs text-gray-500 mt-2">
            Deletion period expired (only allowed within 7 days of submission)
          </p>
        )}
        {isDeletable && daysLeft() > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Can be deleted for {daysLeft()} more day{daysLeft() !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ClaimSkeleton = () => {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded-md mb-1"></div>
      <div className="h-4 w-1/5 bg-gray-200 animate-pulse rounded-md"></div>
    </div>
  );
};

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteSubmission = (id) => {
    setSubmissions(submissions.filter(submission => submission._id !== id));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const axiosConfig = {
      withCredentials: true, // cookie fallback
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    };

    const getUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/profile/profile`,
          axiosConfig
        );
        setName(response.data?.data.fullName);
      } catch (err) {
        console.log("error while getting profile", err);
      }
    };

    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/form/myClaims`,
          axiosConfig
        );

        setSubmissions(
          Array.isArray(response.data.data)
            ? response.data.data
            : []
        );
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    Promise.all([getUser(), fetchSubmissions()]);
  }, []);


  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <SideBar />
      <div className="content w-full h-full flex flex-col">
        <Navbar />
        <div className="areaContent flex w-full px-10 min-h-[calc(100vh-120px)] h-auto rounded-2xl mt-5 flex-col">
          <UserWelcome name={name} isLoading={isLoading} />
          <div className="w-full flex flex-col gap-5">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <ClaimSkeleton key={index} />
              ))
            ) : submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <Claim key={index} {...submission} onDelete={handleDeleteSubmission} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No submissions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;