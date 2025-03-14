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
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">👤 Submitted by: {user?.name || "Unknown User"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors ({numberOfAuthors}): {authors.join(", ")}</p>
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

      <div className="flex flex-col mt-2">
        <p className="text-sm font-semibold">📄 Paper Front:</p>
        <img src={paperFront} alt="Paper Front" className="w-40 h-40 object-cover border rounded-md" />

        <p className="text-sm font-semibold mt-2">📑 Claim Proof:</p>
        <img src={claimProof} alt="Claim Proof" className="w-40 h-40 object-cover border rounded-md" />
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
