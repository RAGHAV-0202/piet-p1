import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";
import baseUrl from "../baseurl.js";

const UserWelcome = () => {
  const [name , setName] = React.useState("")

    React.useState(()=>{
      async function getUser(){
          try{
              const response = await axios.get(`${baseUrl}api/profile/profile` , {withCredentials : true} , {withCredentials : true})
              // console.log(response)
              setName(response.data?.data.fullName)
          }catch(err){
              console.log("error while getting profile")
              console.log(err)
          }
      }

      getUser()
  } , [])

  return (
    <div className="w-full h-[100px] flex pt-5 pb-5 flex-col">
      <h3 className="font-bold text-2xl">Hello, {name}</h3>
      <h6 className="font-semibold text-[14px] text-gray-500">
        Here are your all submissions.
      </h6>
    </div>
  );
};

const Claim = ({ title, authors, publicationDate, venue, webLink, category, calculatedAmount }) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">📅 Published on: {publicationDate || "N/A"}</p>
      <p className="text-sm text-gray-600">🏛 Venue: {venue || "N/A"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors: {authors.length ? authors.join(", ") : "NA"}</p>
      <p className="text-sm text-gray-600">📂 Category: {category}</p>
      <p className="text-sm text-gray-600">💰 Incentive: ₹{calculatedAmount}</p>
      {webLink && (
        <a
          href={webLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          🔗 View Paper
        </a>
      )}
    </div>
  );
};

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]); // Ensure it's an array

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/form/myClaims` , { withCredentials: true } , { withCredentials: true });
        // console.log(response)
        console.log("API Response:", response.data.data); // Debugging

        if (Array.isArray(response.data.data)) {
          setSubmissions(response.data.data);
        } else {
          setSubmissions([]); // Prevent non-array errors
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions([]);
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
          <UserWelcome />
          <div className="w-full flex flex-col gap-5">
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <Claim key={index} {...submission} />
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
