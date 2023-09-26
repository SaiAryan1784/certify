import React, { useState, useRef } from "react";
import { search } from "../assets";
import { useStateContext } from "../context";

const Validate = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const certificateIDRef = useRef(null); // Define the ref here
  const { validateCertificate } = useStateContext();
  const [isValid, setIsValid] = useState(null);

  // Function to handle search
  const handleSearch = () => {
    const certificateID = certificateIDRef.current.value;
    // You can use the searchTerm and certificateID as needed for your search logic.
    // setSearchTerm = data;
    console.log("Search Term:", searchTerm);
    console.log("Certificate ID:", certificateID);

    const getBool = async () => {
      try {
        console.log(certificateID);
        const data = await validateCertificate(certificateID);
        setIsValid(data);
        console.log(`${data}`);
      } catch (error) {
        console.log("contract call failure", error);
      }
    };
    getBool();
    // Call your validateCertificate or search function here
    validateCertificate(certificateID);
  };

  let validationMessage;
  if (isValid === true) {
    validationMessage = <div className="valid">Valid</div>;
  } else if (isValid === false) {
    validationMessage = <div className="invalid">Invalid</div>;
  } else {
    validationMessage = null; // Don't display anything if the result is unknown
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Validation
        </h1>
      </div>
      <div className="lg:flex-1 flex flex-row max-w-[800px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] my-10">
        <div className="SearchBar" style={{ width: "60rem" }}>
          <input
            ref={certificateIDRef}
            id="txt"
            placeholder="Enter certificate Hash"
            style={{ width: "100%" }}
          />
        </div>

        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer search_iconbox"
          onClick={() => {
            handleSearch();
          }}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[40px] object-contain "
          />
        </div>
      </div>

      <div className="display">{validationMessage}</div>
    </div>
  );
};

export default Validate;
