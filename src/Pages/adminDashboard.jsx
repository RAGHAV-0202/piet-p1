import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideBar from "../Components/adminSidebar.jsx";
import AdminNavbar from "../Components/adminNavbar.jsx";
import baseUrl from "../baseurl.js";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import "../CSS/responsive.css";

const AdminWelcome = () => {
  const [data, setData] = useState({ fullName: "Admin User" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdminProfile() {
      try {
        const response = await axios.get(
          `${baseUrl}api/admin/profile`,
          { withCredentials: true }
        );
        setData(response.data?.data);
      } catch (err) {
        console.log("error while getting admin profile");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getAdminProfile();
  }, []);

  if (loading) {
    return (
      <div className="mb-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Hello, {data.fullName}</h1>
      <p className="text-gray-500">Welcome to the admin dashboard, manage all users and submissions.</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [monthlySubmissionData, setMonthlySubmissionData] = useState([]);
  const [userStats, setUserStats] = useState({ total: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  
  // Fetch submissions data
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}api/admin/claims`, { withCredentials: true });
        
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          // Sort submissions by createdAt date (newest first)
          const sortedSubmissions = [...response.data.data].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          
          // Set only top 3 recent submissions for the dashboard
          setRecentSubmissions(sortedSubmissions.slice(0, 3));
          
          // Process all submissions data for the chart
          processSubmissionsForChart(response.data.data);
        } else {
          setRecentSubmissions([]);
          setMonthlySubmissionData([]);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setRecentSubmissions([]);
        setMonthlySubmissionData([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user statistics
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(
            `${baseUrl}api/admin/users`,
            { withCredentials: true }
          );

          console.log(response.data.data.length)
        setUserStats({ total: response.data.data.length, active: response.data.data.length });
      } catch (err) {
        console.error("Error fetching user statistics:", err);
        setUserStats({ total: 0, active: 0 });
      }
    };

    fetchSubmissions();
    fetchUserStats();
  }, []);

  // Process submissions data for the chart based on createdAt field
  const processSubmissionsForChart = (submissions) => {
    // Group submissions by month
    const monthlyData = {};
    
    submissions.forEach(submission => {
      const date = new Date(submission.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { month: monthYear, count: 0, amount: 0 };
      }
      
      monthlyData[monthYear].count += 1;
      monthlyData[monthYear].amount += submission.calculatedAmount || 0;
    });
    
    // Convert to array and sort by date
    const monthsArray = Object.values(monthlyData);
    monthsArray.sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      
      if (aYear !== bYear) return aYear - bYear;
      
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });
    
    // Take the last 6 months or all if less than 6
    const recentMonths = monthsArray.slice(-6);
    setMonthlySubmissionData(recentMonths);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex min-h-screen bg-gray-50" id="main-content">
      <AdminSideBar />
      
      <div className="flex-1">
        <AdminNavbar />
        
        <div className="p-6">
          <AdminWelcome />
          
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ActionCard 
              icon="fa-folder" 
              title="All Submissions"
              description="View and manage all user submissions"
              link="/admin/submissions"
              color="bg-blue-100"
            />
            <ActionCard 
              icon="fa-user" 
              title="All Users"
              description="Manage user accounts and permissions"
              link="/admin/users"
              color="bg-green-100"
            />
            {/* <ActionCard 
              icon="fa-gear" 
              title="Settings"
              description="Configure system settings"
              link="/admin/settings"
              color="bg-purple-100"
            /> */}
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Submissions Panel */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Recent Submissions</h2>
                <a href="/admin/submissions" className="text-green-600 text-sm hover:underline">View all</a>
              </div>
              <p className="text-sm text-gray-500 mb-4">Recently submitted claims from users</p>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-5 w-16 bg-gray-200 animate-pulse rounded mr-4"></div>
                        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {recentSubmissions.map(submission => (
                    <div key={submission._id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <div className="font-medium">{submission.title}</div>
                        <div className="text-xs text-gray-500">{formatDate(submission.createdAt)}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4">₹{submission.calculatedAmount}</div>
                        <StatusBadge status={submission.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <i className="fa-solid fa-file-circle-exclamation text-2xl text-gray-400"></i>
                  </div>
                  <p className="text-gray-500 mb-2">No submissions found</p>
                  <p className="text-sm text-gray-400 mb-4">There are no recent submissions in the system</p>
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Submission Activity Chart */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2">Submission Activity</h2>
                <p className="text-xs text-gray-500 mb-4">System-wide submission trends</p>
                
                {loading ? (
                  <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
                ) : monthlySubmissionData.length > 0 ? (
                  <div className="h-48">
                    <SubmissionChart data={monthlySubmissionData} />
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                    <i className="fa-solid fa-chart-simple text-gray-300 text-2xl mb-2"></i>
                    <p className="text-gray-500">No data available</p>
                    <p className="text-xs text-gray-400">Submissions data will appear here</p>
                  </div>
                )}
              </div>
              
              {/* System Summary Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2">System Summary</h2>
                
                {loading ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 animate-pulse p-3 rounded h-16"></div>
                    <div className="bg-gray-100 animate-pulse p-3 rounded h-16"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-xs text-gray-500">Total Users</div>
                      <div className="text-xl font-medium">{userStats.total}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-xs text-gray-500">Active Users</div>
                      <div className="text-xl font-medium">{userStats.active}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ActionCard = ({ icon, title, description, link, color }) => {
  return (
    <a 
      href={link}
      className={`${color} rounded-lg overflow-hidden shadow-sm h-48 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-16 h-16 flex items-center justify-center">
          <i className={`fa-solid ${icon} text-4xl text-gray-700`}></i>
        </div>
      </div>
      <div className="bg-white p-4 text-center">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </a>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    Submitted: "bg-yellow-100 text-yellow-800",
    Processed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

const SubmissionChart = ({ data }) => {
  const [dataKey, setDataKey] = useState("count");
  
  // If no data is available
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <i className="fa-solid fa-chart-simple text-gray-300 text-2xl mb-2"></i>
        <p className="text-gray-500">No data available</p>
        <p className="text-xs text-gray-400">Submission data will appear here</p>
      </div>
    );
  }

  const handleDataKeyChange = () => {
    setDataKey(prevKey => prevKey === "count" ? "amount" : "count");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 text-right">
        <button 
          onClick={handleDataKeyChange}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
        >
          Show {dataKey === "count" ? "Amount" : "Count"}
        </button>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value.split(' ')[0]} // Show only month abbr
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              width={30}
              tickFormatter={(value) => {
                if (dataKey === "amount") {
                  return `₹${value}`;
                }
                return value;
              }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "amount") {
                  return [`₹${value}`, "Amount"];
                }
                return [value, "Submissions"];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Bar 
              dataKey={dataKey} 
              fill={dataKey === "count" ? "#10B981" : "#3B82F6"} 
              animationDuration={500}
              name={dataKey === "count" ? "Submissions" : "Amount"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        {dataKey === "count" ? "Number of Submissions" : "Total Amount (₹)"}
      </div>
    </div>
  );
};

export default AdminDashboard;