import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/responsive.css"
import baseUrl from "../baseurl.js";
// import { useNavigate } from "react-router-dom";
import AdminSideBar from "../Components/adminSidebar.jsx";
import AdminNavbar from "../Components/adminNavbar.jsx";






const Claim = ({ 
  title, 
  authors, 
  numberOfAuthors, 
  publicationDate, 
  venue, 
  webLink, 
  calculatedAmount, 
  paperFront, 
  claimProof, 
  user,
  createdAt,
  updatedAt
}) => {
  // Function to extract filename from Cloudinary URL
  const getFilenameFromUrl = (url) => {
    if (!url) return '';
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('.')[0];
  };

  // Create a download URL that forces the browser to download rather than display
  const createDownloadUrl = (url) => {
    // For raw files, we'll use the same URL but add a download attribute in the HTML
    return url;
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">👤 Submitted by: {user?.fullName || "Unknown User"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors ({numberOfAuthors}): {Array.isArray(authors) ? authors.join(", ") : JSON.parse(authors[0]).join(", ")}</p>
      <p className="text-sm text-gray-600">📅 Published on: {new Date(publicationDate).toDateString()}</p>
      <p className="text-sm text-gray-600">🏛 Venue: {venue || "N/A"}</p>
      <p className="text-sm text-gray-600">💰 Incentive: ₹{calculatedAmount}</p>
      <p className="text-sm text-gray-600">📅 Created At: {new Date(createdAt).toLocaleString()}</p>
      <p className="text-sm text-gray-600">🕒 Last Updated: {new Date(updatedAt).toLocaleString()}</p>

      {webLink && (
        <a href={webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
          🔗 View Paper
        </a>
      )}

      <div className="flex flex-col mt-4">
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">📄 Paper Front:</p>
          <div className="flex flex-col sm:flex-row gap-2 items-start">
            {/* <div className="w-40 h-40 bg-gray-100 border rounded-md flex items-center justify-center">
              <div className="text-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs mt-1">PDF Document</p>
              </div>
            </div> */}
            <div className="flex flex-col gap-2">
              <a 
                href={paperFront} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-blue-600 transition w-30"
              >
                👁️ View
              </a>
              <a 
                href={paperFront} 
                download={`paper-front-${getFilenameFromUrl(paperFront)}.pdf`}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-green-600 transition w-30"
              >
                ⬇️ Download
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">📑 Claim Proof:</p>
          <div className="flex flex-col sm:flex-row gap-2 items-start">
            {/* <div className="w-40 h-40 bg-gray-100 border rounded-md flex items-center justify-center">
              <div className="text-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs mt-1">PDF Document</p>
              </div>
            </div> */}
            <div className="flex flex-col gap-2">
              <a 
                href={claimProof}
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-blue-600 transition w-30"
              >
                👁️ View
              </a>
              <a 
                href={claimProof} 
                download={`claim-proof-${getFilenameFromUrl(claimProof)}.pdf`}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-green-600 transition w-30"
              >
                ⬇️ Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(submissions[0])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/admin/claims`, { withCredentials: true });
        console.log("API Response:", response.data.data);

        if (Array.isArray(response.data.data)) {
          setSubmissions(response.data.data);
        } else {
          setSubmissions([]);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to fetch submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <AdminSideBar />
      <div className="content w-full h-full flex flex-col">
        <AdminNavbar />
        <div className="areaContent bg-[#EDEFFD] flex w-full py-10 px-10 min-h-[calc(100vh-120px)] h-auto rounded-2xl mt-5 shadow-lg flex-col">
          <h2 className="font-bold text-2xl mb-4">Admin Panel - All Submissions</h2>

          {loading ? (
            <p>Loading submissions...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : submissions.length === 0 ? (
            <p>No submissions found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <Claim key={submission._id} {...submission} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
