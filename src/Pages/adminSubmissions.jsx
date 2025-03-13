import React, { useState, useEffect } from "react";
import axios from "axios";

import baseUrl from "../baseurl.js";
// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";


const SideBar = ()=>{
    const navigate = useNavigate()

    async function handleLogout(){
        try{
            await axios.post(`${baseUrl}api/admin/logout` , { withCredentials: true } , { withCredentials: true })
            navigate("/admin/login")
        }catch(err){
            console.log("error while logging out")
            console.log(err)
        }
    }

    return(
        <div className="sidebar w-[20%] h-dvh bg-white flex flex-col items-center py-[20px] px-[2%]">

            <a href="/admin/dashboard" className="logo h-auto w-[280px] flex flex-row items-center ">
                <button className="h-[60px]"> <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></button>

                <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                    <span className="uppercase">panipat insitute of</span>
                    <span className="uppercase">Engineering and</span>
                    <span className="uppercase">technology</span>
                </div>
            </a>




            <div className="options w-full py-20 h-full  flex-col gap-[40px] transition-all duration-100 justify-between flex flex-col">
                <div className=" py-20 flex flex-col gap-[40px]">
                    <a href="/admin/dashboard" 
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-house text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Dashboard
                        </span>
                    </a>

                    {/* Claim */}

                    {/* My Submissions */}
                    <a href="/admin/submissions" 
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-folder text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Submissions
                        </span>
                    </a>
                    <button onClick={handleLogout}
                    className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                                rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                                bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                                shadow-md hover:scale-105">
                        
                        <span className="w-[50px] flex items-center justify-center h-full">
                            <i className="fa-regular fa-right-from-bracket text-2xl transition-all duration-300"></i> 
                        </span>

                        <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                            Logout
                        </span>
                    </button>   
                </div>
            </div>



        </div>
    )
}


const Navbar = () => {
    const navigate = useNavigate()

    React.useEffect(()=>{
        const getUser = async()=>{
            try{
                const response = await axios.get(`${baseUrl}api/admin/loggedin` , { withCredentials: true } , { withCredentials: true })

                console.log(response)
            }catch(err){
                console.log("error while checking if logged in")
                console.log(err)

                navigate("/admin/login")
            }
        }

        getUser()

        
    } , [])

    return (
        <div className="navbar py-3 px-6 flex-1 w-[80vw] h-[80px] flex items-center justify-end backdrop-blur-md bg-white/10  rounded-lg">
            {/* User Profile */}
            <a href="/profile" className="text-black user w-[220px] h-full flex flex-row items-center gap-4 p-2 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-md hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md">
                
                {/* Profile Image */}
                <div className="left flex justify-center items-center">
                    <img 
                        className="w-[55px] h-[55px] rounded-full border-[3px] border-white shadow-lg"
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
                        alt="user" 
                    />
                </div>

                {/* Name & Role */}
                <div className="right text-black">
                    <p className="text-lg font-semibold">Name</p>
                    <p className="text-sm text-zinc-900">Professor</p>
                </div>
            </a>
        </div>
    );
};


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
      <SideBar />
      <div className="content w-full h-full flex flex-col">
        <Navbar />
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
