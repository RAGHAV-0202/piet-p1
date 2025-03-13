import React from "react";
import Navbar from "../Components/navbar";
import SideBar from "../Components/sidebar";
import axios from "axios";
import baseUrl from "../baseurl";

const Heading = ()=>{
    return(
        <div className="w-full h-[100px] flex pt-5 pb-5  flex-col">
            <h3 className="font-bold text-2xl" >Details for Submission</h3>
            <h6 className="font-semibold text-[14px] text-gray-500">Fill all the details for the submission</h6>
        </div>
    )
}
const ClaimBox = () => {

    const [authors, setAuthors] = React.useState(1);
    const [authorNames, setAuthorNames] = React.useState(Array(7).fill(''));

    const [title, setTitle] = React.useState('');
    const [publicationDate, setPublicationDate] = React.useState('');
    const [webLink, setWebLink] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [paperFront, setPaperFront] = React.useState(null);
    const [claimProof, setClaimProof] = React.useState(null);

    const [errors, setErrors] = React.useState({});

    const handleNumberAuthors = (e) => {
        setAuthors(parseInt(e.target.value));
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
        if (!title.trim()) newErrors.title = true;
        if (!publicationDate) newErrors.publicationDate = true;
        if (!webLink.trim()) newErrors.webLink = true;
        if (!venue.trim()) newErrors.venue = true;
        if (!paperFront) newErrors.paperFront = true;
        if (!claimProof) newErrors.claimProof = true;

        authorNames.slice(0, authors).forEach((name, index) => {
            if (!name.trim()) {
                newErrors[`author${index}`] = true;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('numberOfAuthors', authors);
        formData.append('publicationDate', publicationDate);
        formData.append('webLink', webLink);
        formData.append('venue', venue);
        formData.append('calculatedAmount', (10000 / authors).toFixed(0));

        authorNames.slice(0, authors).forEach((name, index) => {
            formData.append(`author${index + 1}`, name);
        });

        formData.append('paperFront', paperFront);
        formData.append('claimProof', claimProof);

        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name, value.type, value.size + " bytes");
            } else {
                console.log(`${key}:`, value);
            }
        }
    };

    const errorClass = "border-red-500";

    return (
        <div className="claimBox flex w-full h-full rounded-2xl p-5 flex-col">
            <Heading />

            <span className="mb-5">
                <p>Title of Paper <span className="text-red-600">*</span></p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full border h-8 rounded-sm max-w-[400px] px-2 ${errors.title ? errorClass : ''}`}
                    type="text"
                    placeholder="Title"
                />
            </span>

            <span className="mb-5">
                <p>Number of Authors <span className="text-red-600">*</span></p>
                <select
                    onChange={handleNumberAuthors}
                    defaultValue={1}
                    className="w-full border h-8 rounded-sm max-w-[400px] px-2"
                >
                    {[...Array(7)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </span>

            <div className="w-full flex flex-wrap ml-5 mb-5">
                {[...Array(authors)].map((_, index) => (
                    <span key={index} className="mb-2 mr-10">
                        <p>Name of Author {index + 1} <span className="text-red-600">*</span></p>
                        <input
                            value={authorNames[index]}
                            onChange={(e) => handleAuthorChange(index, e.target.value)}
                            className={`w-full border h-8 rounded-sm max-w-[400px] px-2 ${errors[`author${index}`] ? errorClass : ''}`}
                            type="text"
                            placeholder="Author"
                        />
                    </span>
                ))}
            </div>

            <span className="mb-5">
                <p>Date of Publication <span className="text-red-600">*</span></p>
                <input
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    className={`w-auto border h-8 rounded-sm max-w-[400px] px-2 ${errors.publicationDate ? errorClass : ''}`}
                    type="date"
                />
            </span>

            <span className="mb-5">
                <p>Web link of research document <span className="text-red-600">*</span></p>
                <input
                    value={webLink}
                    onChange={(e) => setWebLink(e.target.value)}
                    className={`w-auto border h-8 rounded-sm max-w-[400px] px-2 ${errors.webLink ? errorClass : ''}`}
                    type="text"
                    placeholder="Link"
                />
            </span>

            <span className="mb-5">
                <p>Venue for Paper <span className="text-red-600">*</span></p>
                <input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className={`w-auto border h-8 rounded-sm max-w-[400px] px-2 ${errors.venue ? errorClass : ''}`}
                    type="text"
                    placeholder="Venue"
                />
            </span>

            <span className="mb-5">
                <p className="font-medium text-[14px]">Research Paper Front <span className="text-red-600">*</span></p>
                <label
                    htmlFor="paperFrontUpload"
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >
                    {/* icon */}
                    Upload PDF
                    <input
                        id="paperFrontUpload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {paperFront && (
                    <p className="mt-2 text-green-600 font-medium">
                        Uploaded: {paperFront.name}
                    </p>
                )}
            </span>

            <span className="mb-5">
                <p className="font-medium text-[14px]">Claim Proof <span className="text-red-600">*</span></p>
                <label
                    htmlFor="claimProofUpload"
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >
                    {/* icon */}
                    Upload PDF
                    <input
                        id="claimProofUpload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleProofChange}
                        className="hidden"
                    />
                </label>

                {claimProof && (
                    <p className="mt-2 text-green-600 font-medium">
                        Uploaded: {claimProof.name}
                    </p>
                )}
            </span>


            <span className="mb-5">
                <p>Calculated Amount: {(10000 / authors).toFixed(0)} Rs.</p>
            </span>

            <button onClick={handleSubmit} type="button" className="w-[200px] h-[40px] bg-green-400 font-semibold rounded-2xl">
                Submit
            </button>
        </div>
    );
};


const ClaimBox2 = () =>{

  

    const [authors, setAuthors] = React.useState(1);
    const [authorNames, setAuthorNames] = React.useState(Array(7).fill(''));
    const [authorAffiliation, setAffilation] = React.useState(Array(7).fill(''));
    const [category , setCategory] = React.useState("SCIE / WOS / ESCI")
    const [incentive , setIncentive] = React.useState(10000)
    const [title, setTitle] = React.useState('');
    const [publicationDate, setPublicationDate] = React.useState('');
    const [webLink, setWebLink] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [paperFront, setPaperFront] = React.useState(null);
    const [claimProof, setClaimProof] = React.useState(null);

    const [errors, setErrors] = React.useState({});

    const handleNumberAuthors = (e) => {
        setAuthors(parseInt(e.target.value));
    };

    const handleCategory = (value) =>{
        const raw = value.target.value 
        const arr = raw.split(',')

        const category = arr[0];
        const incentive = arr[1];
        
        setCategory(category)
        setIncentive(incentive) ;
    }

    const handleAuthorAffiliationChange = (index, value) => {
        const updatedAffilation = [...authorAffiliation];
        updatedAffilation[index] = value;
        setAffilation(updatedAffilation);
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
        if (!title.trim()) newErrors.title = true;
        if (!publicationDate) newErrors.publicationDate = true;
        if (!webLink.trim()) newErrors.webLink = true;
        if (!venue.trim()) newErrors.venue = true;
        if (!paperFront || !(paperFront instanceof File)) newErrors.paperFront = true;
        if (!claimProof || !(claimProof instanceof File)) newErrors.claimProof = true;

        

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


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("numberOfAuthors", authors);
        formData.append("publicationDate", publicationDate);
        formData.append("webLink", webLink);
        formData.append("venue", venue);
        formData.append("category", category);
        formData.append("calculatedAmount", (incentive / authors).toFixed(0));

        // Append author names & affiliations correctly
        authorNames.slice(0, authors).forEach((name, index) => {
            formData.append(`authors[${index}]`, name);
        });

        authorAffiliation.slice(0, authors).forEach((affiliation, index) => {
            formData.append(`authorAffiliation[${index}]`, affiliation);
        });

        formData.append("paperFront", paperFront);
        formData.append("claimProof", claimProof);

        try {
            const response = await axios.post(`${baseUrl}api/form/claim`, 
                formData, 
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true, // Send authentication cookies
                }
            );

            console.log("Claim submitted successfully:", response.data);
            alert("Claim submitted successfully!");
        } catch (error) {
            console.error("Error submitting claim:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to submit claim");
        }
    };


    const errorClass = "border-red-500";
   

    return(
        <div className="claimBox flex w-full h-full rounded-2xl p-5 flex-col  items-center">
            <h1 className="text-xl font-bold pb-10" >Enter Details for Claim</h1>     

            <div className="areaForDetails w-full bg-white py-10 rounded-3xl px-10 max-w-[800px] flex flex-col">

            <span className="mb-5">
                    <p>Category of submission <span className="text-red-600">*</span></p>
                    <select
                        onChange={handleCategory}
                        defaultValue={"Research Paper"}
                        className="w-full border h-12 rounded-sm max-w-[400px] px-6 flex items-center"
                    >
                    <option value={["SCIE / WOS / ESCI" , 10000]}>SCIE / WOS / ESCI (10000)</option>
                    <option value={["ESCI SCOPUS" , 5000]}>ESCI SCOPUS (5000)</option>
                    <option value={["Book Chapter international" , 5000]}>Book Chapter International (5000)</option>
                    <option value={["Book Chapter national" , 3000]}>Book Chapter National (3000)</option>
                    <option value={["UGC" , 3500]}>UGC (3500)</option>
                    <option value={["PUBLICATION" , 15000]}>Publication (15000)</option>
                    </select>
                </span>

                <span className="mb-5">
                    <span className="pb-4">Title of the research paper</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${errors.title ? errorClass : ''}`}
                        type="text"
                        placeholder="Title"
                    />
                </span>


                <span className="mb-5">
                    <p>Number of Authors <span className="text-red-600">*</span></p>
                    <select
                        onChange={handleNumberAuthors}
                        defaultValue={1}
                        className="w-full border h-12 rounded-sm max-w-[400px] px-6 flex items-center"
                    >
                        {[...Array(7)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </span>

                <div className="w-full flex flex-wrap ml-5 mb-5">
                    {[...Array(authors)].map((_, index) => (
                        <span key={index} className="mb-2 mr-10">
                            <p>Author {index + 1} <span className="text-red-600">*</span></p>
                            <div className="flex flex-row w-full gap-10">
                                <input
                                    value={authorNames[index]}
                                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                                    className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${errors[`author${index}`] ? errorClass : ''}`}
                                    type="text"
                                    placeholder="Author's Name"
                                />
                                <input
                                    value={authorAffiliation[index]}
                                    onChange={(e) => handleAuthorAffiliationChange(index, e.target.value)}
                                    className={`w-full border h-8 rounded-sm border-transparent bg-zinc-100 px-6 py-6 ${errors[`affiliation${index}`] ? errorClass : ''}`}
                                    type="text"
                                    placeholder="Author's Affiliation"
                                />
                            </div>
                        </span>
                    ))}
                </div>


                <span className="mb-5">
                    <p>Date of Publication <span className="text-red-600">*</span></p>
                    <input
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${errors.title ? errorClass : ''}`}
                        type="date"
                    />
                </span>

                <span className="mb-5">
                    <p>Web link of research document <span className="text-red-600">*</span></p>
                    <input
                        value={webLink}
                        onChange={(e) => setWebLink(e.target.value)}
                        className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${errors.title ? errorClass : ''}`}
                        type="text"
                        placeholder="Link"
                    />
                </span>

                <span className="mb-5">
                    <p>Venue for Paper <span className="text-red-600">*</span></p>
                    <input
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className={`w-full border h-8 rounded-sm border-transparent bg-zinc-200 px-6 py-6 ${errors.title ? errorClass : ''}`}
                        type="text"
                        placeholder="Venue"
                    />
                </span>

                <span className="mb-5">
                    <p className="font-medium text-[14px]">Research Paper Front <span className="text-red-600">*</span></p>
                    <label
                        htmlFor="paperFrontUpload"
                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        {/* icon */}
                        Upload PDF
                        <input
                            id="paperFrontUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {paperFront && (
                        <p className="mt-2 text-green-600 font-medium">
                            Uploaded: {paperFront.name}
                        </p>
                    )}
                </span>

                <span className="mb-5">
                    <p className="font-medium text-[14px]">Proof of Claim<span className="text-red-600">*</span></p>
                    <label
                        htmlFor="claimProofUpload"
                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        {/* icon */}
                        Upload PDF
                        <input
                            id="claimProofUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleProofChange}
                            className="hidden"
                        />
                    </label>

                    {claimProof && (
                        <p className="mt-2 text-green-600 font-medium">
                            Uploaded: {claimProof.name}
                        </p>
                    )}
                </span>


                <span className="mb-5">
                    <p className="font-medium">Calculated Amount: {(incentive / authors).toFixed(0)} Rs.</p>
                </span>

                <div className="w-full flex items-center justify-center">
                    <button onClick={handleSubmit} type="button" className="w-[200px] h-[40px] cursor-pointer flex items-center justify-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition">
                        Submit
                    </button>
                </div>



            </div>




        </div>
    )
}


const Claim = () => {
    return (
        <div className="claim h-full w-full flex pr-5 pb-10 ">
            <SideBar />
            <div className="content flex flex-col w-full">
                <Navbar />
                <div className="areaContent bg-[#EDEFFD] flex w-full h-full py-[20px] px-[20px] min-h-[calc(100vh-120px)] rounded-2xl mt-5 shadow-2xs flex-col">
                    <ClaimBox2 />
                </div>
            </div>
        </div>
    )
}

export default Claim;
