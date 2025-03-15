import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/adminNavbar.jsx";
import AdminSideBar from "../Components/adminSidebar.jsx";
import "../CSS/responsive.css";
import axios from "axios";
import baseUrl from "../baseurl.js";

// Modal component for viewing user submissions
const SubmissionsModal = ({ isOpen, onClose, userId, userName }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserSubmissions(userId);
    }
  }, [isOpen, userId]);

  const fetchUserSubmissions = async (userId) => {
    try {
      setLoading(true);
      // Endpoint to fetch claims for a specific user
      const response = await axios.get(
        `${baseUrl}api/admin/users/${userId}/claims`, 
        { withCredentials: true }
      );

      // Access the claims array from the response structure
      setSubmissions(response.data.data.claims || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user submissions:", err);
      setError("Failed to load submissions. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">{userName}'s Submissions</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No submissions found for this user.</div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission._id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{submission.title || `Submission #${submission._id.substring(0, 8)}`}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(submission.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Venue: {submission.venue || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-700">
                        Amount: ₹{submission.calculatedAmount?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                    {/* <span className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                      submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status || 'Pending'}
                    </span> */}
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">
                    Authors: {Array.isArray(submission.authors) ? 
                      submission.authors.join(', ') : 
                      (typeof submission.authors === 'string' ? 
                        submission.authors.replace(/[\[\]"]/g, '') : 
                        'No authors listed')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
// Modal component for viewing user profile
const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">User Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow">
                <img src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                     alt={user.fullName} 
                     className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
              <p className="text-gray-600">{user.email}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-gray-700">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm"><span className="font-medium">Department:</span> {user.department || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Designation:</span> {user.designation || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Employee ID:</span> {user.employeeId || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Academic IDs</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm"><span className="font-medium">Scopus ID:</span> {user.scopusId || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">Vidhwan ID:</span> {user.vidhwanId || 'N/A'}</p>
                    <p className="text-sm"><span className="font-medium">ORCID ID:</span> {user.orcidId || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Banking Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm"><span className="font-medium">Bank Account:</span> {user.bankAccount || 'N/A'}</p>
                  <p className="text-sm"><span className="font-medium">IFSC Code:</span> {user.ifsc || 'N/A'}</p>
                  <p className="text-sm"><span className="font-medium">Branch:</span> {user.branch || 'N/A'}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Account Status</h3>
                <div className="mt-2">
                  <p className="text-sm"><span className="font-medium">Account Created:</span> {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}</p>
                  <p className="text-sm"><span className="font-medium">Last Updated:</span> {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const UserRow = ({ user, onViewSubmissions, onViewProfile, onRemoveUser }) => {
  // Count the number of claims if they exist
  const claimsCount = user.claims ? user.claims.length : 0;
  
  return (
    <tr className="border-b hover:bg-gray-50">
      {/* <td className="py-4 pl-4">
        <input type="checkbox" className="rounded " />
      </td> */}
      <td className="py-4">
        <div className="flex items-center gap-3 pl-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={user.fullName} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs text-gray-400">{user.department} • {claimsCount} {claimsCount === 1 ? 'claim' : 'claims'}</div>
          </div>
        </div>
      </td>
      <td className="py-4">
        <div className="flex gap-2 justify-end md:justify-start">
          <button 
            onClick={() => onViewProfile(user)} 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200"
            title="View Profile"
          >
            <i className="fa-regular fa-user text-sm"></i>
          </button>
          <button 
            onClick={() => onViewSubmissions(user._id, user.fullName)} 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
            title="View Submissions"
          >
            <i className="fa-regular fa-folder-open text-sm"></i>
          </button>
          <button 
            onClick={() => onRemoveUser(user._id)} 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200"
            title="Remove User"
          >
            <i className="fa-regular fa-trash-can text-sm"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submissionsModalOpen, setSubmissionsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}api/admin/users`,
        { withCredentials: true }
      );
      setUsers(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
      setLoading(false);
    }
  };

  const handleViewSubmissions = (userId, userName) => {
    setSelectedUser({ id: userId, name: userName });
    setSubmissionsModalOpen(true);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setProfileModalOpen(true);
  };

  const handleRemoveUser = async (userId) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await axios.delete(
          `${baseUrl}api/admin/users/${userId}`,
          { withCredentials: true }
        );
        // Refresh user list after deletion
        fetchUsers();
      } catch (err) {
        console.error("Error removing user:", err);
        alert("Failed to remove user. Please try again.");
      }
    }
  };

//   const handleAddUser = () => {
//     // Implement add user functionality or navigation to add user form
//     console.log("Add new user");
//   };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    (user.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (user.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard_main_div h-auto min-h-screen w-screen flex flex-row">
      <AdminSideBar/>
      <div className="dashboard_content w-[80%] flex flex-col flex-1">
        <AdminNavbar/>
        <div className="dashboard_areaContent bg-[#EDEFFD] flex w-full min-h-[calc(100vh-80px)] h-auto rounded-2xl mt-5 shadow-2xs flex-col p-5 md:p-10">
          <div className="bg-white shadow rounded-lg w-full">
            <div className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold">Users Management</h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-purple-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                  
                  {/* <button
                    onClick={handleAddUser}
                    className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add User
                  </button> */}
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchTerm ? "No users matching your search" : "No users found"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* <th className="w-12 py-3 pl-4">
                        <input type="checkbox" className="rounded" />
                      </th> */}
                      <th className="text-left py-3 font-medium pl-3">User</th>
                      <th className="text-right md:text-left py-3 pr-4 md:pr-0 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <UserRow
                        key={user._id}
                        user={user}
                        onViewSubmissions={handleViewSubmissions}
                        onViewProfile={handleViewProfile}
                        onRemoveUser={handleRemoveUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <SubmissionsModal 
        isOpen={submissionsModalOpen}
        onClose={() => setSubmissionsModalOpen(false)}
        userId={selectedUser?.id}
        userName={selectedUser?.name}
      />
      
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;

