import React, { useState , useEffect } from "react";
import axios from "axios";
import "../CSS/responsive.css"
import baseUrl from "../baseurl.js";
import AdminSideBar from "../Components/adminSidebar.jsx";
import AdminNavbar from "../Components/adminNavbar.jsx";
// Import xlsx library for Excel export
import * as XLSX from 'xlsx';

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
  updatedAt,
  totalAmount,
  category,
  status,
  _id,
  onStatusChange, // New prop to handle status updates
  onDelete // New prop to handle deletion
}) => {
  const [processing, setProcessing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Function to extract filename from Cloudinary URL
  const getFilenameFromUrl = (url) => {
    if (!url) return '';
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('.')[0];
  };

  // Function to set status to "Processed"
  const handleSetProcessed = async () => {
    try {
      setProcessing(true);
      const response = await axios.post(`${baseUrl}api/admin/update`, {
        _id,
        status: "Processed"
      }, { withCredentials: true });
      
      if (response.status === 200) {
        // Call the parent component's callback to update UI
        if (onStatusChange) onStatusChange(_id, "Processed");
      } else {
        alert("Failed to update claim status");
      }
    } catch (error) {
      console.error("Error updating claim status:", error);
      alert("An error occurred while updating claim status");
    } finally {
      setProcessing(false);
    }
  };

  // Function to delete claim
  const handleDelete = async () => {
    // Confirm before deletion
    if (!window.confirm("Are you sure you want to delete this claim? This action cannot be undone.")) {
      return;
    }
    
    try {
      setDeleting(true);
      const response = await axios.post(`${baseUrl}api/admin/delete`, {
        _id
      }, { withCredentials: true });
      
      if (response.status === 200) {
        // Call the parent component's callback to update UI
        if (onDelete) onDelete(_id);
      } else {
        alert("Failed to delete claim");
      }
    } catch (error) {
      console.error("Error deleting claim:", error);
      alert("An error occurred while deleting the claim");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">👤 Submitted by: {user?.fullName || "Unknown User"}</p>
      <p className="text-sm text-gray-600">🗂️ Category : {category[0] || "Not Available"}</p>
      <p className="text-sm text-gray-600">💰 Category Incentive : ₹{totalAmount || "N/A"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors ({numberOfAuthors}): {Array.isArray(authors) ? authors.join(", ") : JSON.parse(authors[0]).join(", ")}</p>
      <p className="text-sm text-gray-600">📅 Published on: {new Date(publicationDate).toDateString()}</p>
      <p className="text-sm text-gray-600">🏛 Venue: {venue || "N/A"}</p>
      <p className="text-sm text-gray-600">💰 Calculated Incentive: ₹{calculatedAmount}</p>
      <p className="text-sm text-gray-600">📅 Submitted at: {new Date(createdAt).toLocaleString()}</p>
      <p className="text-sm text-gray-600">🟢 Status: {status}</p>

      {webLink && (
        <a href={webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
          🔗 View Paper
        </a>
      )}

      <div className="flex flex-col mt-4">
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
              {/* <a 
                href={paperFront} 
                download={`paper-front-${getFilenameFromUrl(paperFront)}.pdf`}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-green-600 transition w-30"
              >
                ⬇️ Download
              </a> */}
            </div>
          </div>
        </div>

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
              {/* <a 
                href={claimProof} 
                download={`claim-proof-${getFilenameFromUrl(claimProof)}.pdf`}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-green-600 transition w-30"
              >
                ⬇️ Download
              </a> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 flex flex-row gap-3">
        <button 
          onClick={handleSetProcessed}
          disabled={processing || status === "Processed"}
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition
            ${status === "Processed" 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          {processing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : status === "Processed" ? "✓ Processed" : "✓ Set as Processed"}
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-red-600 transition"
        >
          {deleting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </>
          ) : "🗑️ Delete Claim"}
        </button>
      </div>
    </div>
  );
};

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  const [filters, setFilters] = useState({
    department: "ALL",
    status: "ALL"
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/admin/claims`, { withCredentials: true });

        if (Array.isArray(response.data.data)) {
          setSubmissions(response.data.data);
          setFilteredSubmissions(response.data.data);
        } else {
          setSubmissions([]);
          setFilteredSubmissions([]);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let result = [...submissions];
    
    // Filter by department if selected
    if (filters.department !== "ALL") {
      // Assuming user has a department property, adjust as needed
      result = result.filter(submission => 
        submission.user?.department === filters.department
      );
    }
    
    // Filter by status if selected
    if (filters.status !== "ALL") {
      result = result.filter(submission => 
        submission.status === filters.status
      );
    }
    
    setFilteredSubmissions(result);
  };

  // Function to prepare data for Excel export
  const prepareExportData = (data) => {
    return data.map(item => {
      // Parse authors if needed
      let authorsList = item.authors;
      if (typeof item.authors[0] === 'string' && item.authors[0].startsWith('[')) {
        try {
          authorsList = JSON.parse(item.authors[0]);
        } catch (e) {
          authorsList = item.authors;
        }
      }
      
      // Format authors as string
      const authorsFormatted = Array.isArray(authorsList) 
        ? authorsList.join(", ") 
        : authorsList;

      return {
        'Title': item.title || 'Untitled',
        'Submitted By': item.user?.fullName || 'Unknown',
        'Department': item.user?.department || 'N/A',
        'Category': item.category?.[0] || 'N/A',
        'Total Incentive (₹)': item.totalAmount || 0,
        'Calculated Incentive (₹)': item.calculatedAmount || 0,
        'Authors': authorsFormatted,
        'Number of Authors': item.numberOfAuthors || 0,
        'Publication Date': new Date(item.publicationDate).toDateString(),
        'Venue': item.venue || 'N/A',
        'Submission Date': new Date(item.createdAt).toLocaleString(),
        'Status': item.status || 'N/A',
        'Web Link': item.webLink || 'N/A'
      };
    });
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    try {
      setExportLoading(true);
      
      // Prepare the data
      const exportData = prepareExportData(filteredSubmissions);
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
      
      // Generate Excel file and trigger download
      const fileName = `submissions_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      setTimeout(() => {
        setExportLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Export error:', error);
      setExportLoading(false);
      alert('Failed to export data. Please try again.');
    }
  };

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    // Update both submissions arrays
    const updateSubmission = (submissionArray) => {
      return submissionArray.map(submission => {
        if (submission._id === id) {
          return { ...submission, status: newStatus };
        }
        return submission;
      });
    };
    
    setSubmissions(updateSubmission(submissions));
    setFilteredSubmissions(updateSubmission(filteredSubmissions));
  };
  
  // Function to handle claim deletion
  const handleDelete = (id) => {
    // Remove the deleted submission from both arrays
    setSubmissions(submissions.filter(submission => submission._id !== id));
    setFilteredSubmissions(filteredSubmissions.filter(submission => submission._id !== id));
  };

  return (
    <div className="h-auto min-h-[100vh] w-full flex flex-row pr-5">
      <AdminSideBar />
      <div className="content w-full h-full flex flex-col">
        {/* <AdminNavbar /> */}
        <div className="areaContent bg-[#EDEFFD] flex w-full py-10 px-10 min-h-[calc(100vh)] h-auto rounded-2xl mt-5 shadow-lg flex-col">
          <h2 className="font-bold text-2xl mb-4">Admin Panel - All Submissions</h2>

          <div className="w-full h-auto py-4 bg-white mb-3 flex flex-row items-center px-[20px] rounded-xl gap-[20px] flex-wrap">
            <span className="flex flex-row items-center">
              <p className="pr-[10px]">Department:</p>
              <select 
                className="border-none outline-none px-3 py-1 bg-zinc-200 text-black rounded-md text-sm flex items-center justify-center hover:bg-zinc-100 transition w-30"
                name="department" 
                value={filters.department} 
                onChange={handleFilterChange}
              >
                <option value="ALL">ALL</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="AIDS">AIDS</option>
                <option value="CYS">CYS</option>
                <option value="IT">IT</option>
                <option value="ME">ME</option>
                <option value="TEXTILE">TEXTILE</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </span>

            <span className="flex flex-row items-center">
              <p className="pr-[10px]">Status:</p>
              <select 
                className="border-none outline-none px-3 py-1 bg-zinc-200 text-black rounded-md text-sm flex items-center justify-center hover:bg-zinc-100 transition w-30"
                name="status" 
                value={filters.status} 
                onChange={handleFilterChange}
              >
                <option value="ALL">ALL</option>
                <option value="Submitted">Submitted</option>
                <option value="Processed">Processed</option>
              </select>
            </span>

            <button 
              className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center justify-center hover:bg-green-600 transition"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            
            <button 
              className={`px-3 py-1 bg-blue-600 text-white rounded-md text-sm flex items-center justify-center hover:bg-blue-700 transition ${exportLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={exportToExcel}
              disabled={exportLoading || filteredSubmissions.length === 0}
            >
              {exportLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>📊 Export to Excel</>
              )}
            </button>
            
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : filteredSubmissions.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center">
              <p className="text-gray-600">No submissions match your current filters.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  setFilters({ department: "ALL", status: "ALL" });
                  setFilteredSubmissions(submissions);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubmissions.map((submission) => (
                <Claim 
                  key={submission._id} 
                  {...submission} 
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;