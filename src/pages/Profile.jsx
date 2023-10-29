import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { useAddress } from "@thirdweb-dev/react";

const Card = ({ campaign }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        src={`https://bronze-mammoth-vicuna-556.mypinata.cloud/ipfs/${campaign.imageIpfs}`}
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-red-500">
          {campaign.title}
        </div>
        <p className="text-gray-700 text-base">{campaign.description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700">Location: {campaign.location}</p>
        <p className="text-gray-700">Date: {campaign.date}</p>
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
        console.log(data);
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
          Your campaign
        </h1>
      </div>

      <div className="container">
        <div className="grid grid-cols-2 gap-4">
          {campaignData.length > 0 &&
            campaignData.map((campaignData, key) => (
              <div key={key}>
                {campaignData.owner !==
                  "0x0000000000000000000000000000000000000000" && (
                  <Card key={key} campaign={campaignData} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
