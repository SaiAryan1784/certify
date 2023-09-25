import React, { useState, useEffect } from "react";
import { search } from "../assets";
import { useStateContext } from "../context";
import { useAddress } from "@thirdweb-dev/react";

const Profile = () => {
  const { getCertificateByAddress } = useStateContext();
  const [certificateData, setCertificateData] = useState([]);
  const address = useAddress();

  useEffect(() => {
    const getCall = async () => {
      try {
        const data = await getCertificateByAddress(address);
        setCertificateData(data);
        console.log("contract call success");
      } catch (error) {
        console.log("contract call failure", error);
      }
    };
    getCall();
  }, [address]);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] my-10">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          All certificate
        </h1>
      </div>

      <div className="container">
        <div>
          {certificateData.length > 0 &&
            certificateData[0].map((certificate, index) => (
              <a
                href={`https://bronze-mammoth-vicuna-556.mypinata.cloud/ipfs/${certificate.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div className="container_inner">
                  <h2 className="certificateNumber">Certificate {index + 1}</h2>
                  <p>
                    <span>Certificate Type:</span> {certificate.certificateType}
                  </p>
                  <p>
                    <span>Date of Issue:</span> {certificate.dateOfIssue}
                  </p>
                  <p>
                    <span>IPFS Hash</span> {certificate.ipfsHash}
                  </p>
                  <p>
                    <span>Issuer:</span> {certificate.issuer}
                  </p>
                  <p>
                    <span>Recipient:</span> {certificate.recipient}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
