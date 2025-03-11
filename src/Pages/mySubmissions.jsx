import React, { useState } from "react";
import Navbar from "../Components/navbar.jsx";
import SideBar from "../Components/sidebar.jsx";

const UserWelcome = () => {
  return (
    <div className="w-full h-[100px] flex pt-5 pb-5 flex-col">
      <h3 className="font-bold text-2xl">Hello, Dr. Anju Bhandari</h3>
      <h6 className="font-semibold text-[14px] text-gray-500">
        Here are your all submissions.
      </h6>
    </div>
  );
};

const Claim = ({ title, authors, publicationDate, venue, webLink, category, incentive }) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md flex flex-col gap-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Paper"}</h3>
      <p className="text-sm text-gray-600">📅 Published on: {publicationDate || "N/A"}</p>
      <p className="text-sm text-gray-600">🏛 Venue: {venue || "N/A"}</p>
      <p className="text-sm text-gray-600">👨‍🎓 Authors: {authors}</p>
      <p className="text-sm text-gray-600">📂 Category: {category}</p>
      <p className="text-sm text-gray-600">💰 Incentive: ₹{incentive}</p>
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
  const [submissions, setSubmissions] = useState([
    {
      title: "Deep Learning in Medical Imaging",
      authors: 3,
      publicationDate: "2023-09-15",
      venue: "IEEE Transactions on Medical Imaging",
      webLink: "https://example.com",
      category: "SCIE / WOS / ESCI",
      incentive: 10000,
    },
    {
      title: "AI for Climate Change",
      authors: 2,
      publicationDate: "2024-02-10",
      venue: "Springer Nature",
      webLink: "https://example.com",
      category: "SCIE / WOS / ESCI",
      incentive: 12000,
    },
  ]);

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