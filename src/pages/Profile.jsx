import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { useAddress } from "@thirdweb-dev/react";

const Card = ({ campaign }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={campaign.imageUrl} alt={campaign.title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{campaign.title}</div>
        <p className="text-gray-700 text-base">{campaign.description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700">Location: {campaign.location}</p>
        <p className="text-gray-700">Data: {campaign.data}</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const address = useAddress();
  console.log(address);
  if (address === undefined) return;
  const { getCampaignByAddress } = useStateContext();
  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    const getCall = async () => {
      try {
        const data = await getCampaignByAddress(address);
        setCampaignData(data);
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
          All campaign
        </h1>
      </div>

      <div className="container">
        <div>
          {campaignData.length > 0 &&
            campaignData[0].map((campaignData, key) => {
              <Card key={key} campaign={campaign} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
