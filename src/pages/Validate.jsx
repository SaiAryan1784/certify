import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";


const Card = ({ campaign }) => {
  console.log(campaign);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* <img src={campaign[]} alt={campaign[2]} className="w-full" /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{campaign[2]}</div>
        <p className="text-gray-700 text-base">{campaign[3]}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700">Location: {campaign[4]}</p>
        <p className="text-gray-700">Data: {campaign[5]}</p>
      </div>
    </div>
  );
};


const Validate = () => {
  const { getCampaigns } = useStateContext();

  const [campaignData, setCampaignData] = useState([]);
  useEffect(() => {
    const getCall = async () => {
      try {
        const data = await getCampaigns();
        setCampaignData(data);
        console.log("contract call success");
        console.log(data);
      } catch (error) {
        console.log("contract call failure", error);
      }
    };
    getCall();
  }, []);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Campaigns
        </h1>
      </div>

      <div className="container">
        <div>
          {campaignData.length > 0 &&
            campaignData.map((campaignData, key) => (
              <div key={key}>
                <p>Title: {campaignData[2]}</p>
                <p>Description: {campaignData[3]}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Validate;
