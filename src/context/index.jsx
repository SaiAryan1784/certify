import React, {
    useContext,
    createContext,
    useRef,
    useEffect,
    useState,
} from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";


import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";

const StateContext = createContext();
const Certificate = createContext();

export const StateContextProvider = ({ children }) => {

  const [walletConnected, setWalletConnected] = useState(false);
  const address = useAddress();
  const connect = useMetamask();
  const web3ModalRef = useRef();
  console.log(web3ModalRef);
  let signer;
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);


        // If user is not connected to the Mumbai network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        console.log(chainId);

        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    };
    const connectWallet = async () => {
        try {
            // Get the provider from web3Modal, which in our case is MetaMask
            // When used for the first time, it prompts the user to connect their wallet
            await getProviderOrSigner();
            setWalletConnected(true);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
        if (!walletConnected) {
            // Assign the Web3Modal class to the reference object by setting it's `current` value
            // The `current` value is persisted throughout as long as this page is open
            web3ModalRef.current = new Web3Modal({
                network: "mumbai",
                providerOptions: {},
                disableInjectedProvider: false,
            });

            connectWallet();
        }
    }, [walletConnected]);


  const publishCampaign = async (form) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    console.log("uplading");
    try {
      const data = await contract.createCampaign(
        address,
        form.title,
        form.description,
        form.location,
        form.date,
        form.duration,
        form.deadline,
        form.imageIpfs
      );
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const getCampaignByAddress = async (form) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    console.log("getting campaign by owner");
    try {
      const data = await contract.createCampaign(address);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        publishCampaign,
        getCampaignByAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );

};

export const useStateContext = () => useContext(StateContext);
export { Certificate };
