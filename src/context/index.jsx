import React, {
  useContext,
  createContext,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";
import { abi2, NFT_CONTRACT_ADDRESS_2 } from "../constants";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();
const Certificate = createContext();

export const StateContextProvider = ({ children }) => {
  // const { mutateAsync: issueCertificate } = useContractWrite(
  //   contract,
  //   "issueCertificate"
  // );
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

  const publishCertificate = async (form) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS_2, abi2, signer);
    console.log("uplading");
    try {
      const data = await contract.issueCertificate(
        form.recipient,
        form.certificateType,
        form.issueDate,
        form.ipfsHash
      );
      // console.log(form);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
      alert("You are not a authorized issuer");
    }
  };

  const getCertificate = async (ipfsHash) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS_2, abi2, signer);
    console.log("getting");
    try {
      const data = await contract.getCertificateByAddress(
        "0x7543e79FBc62E0312f93811045773A8344c61CDC"
      );
      // console.log(form);
      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCertificateByAddress = async (recipientAddress) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS_2, abi2, signer);
    console.log("getting by address");
    try {
      const pre_data = await contract.getCertificateByAddress(recipientAddress);

      return [pre_data];
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const validateCertificate = async (certificatId) => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(NFT_CONTRACT_ADDRESS_2, abi2, signer);
    console.log("getting by address");
    try {
      const pre_data = await contract.validateCertificate(certificatId);
      return pre_data;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        issueCertificate: publishCertificate,
        getCertificate,
        getCertificateByAddress,
        validateCertificate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export { Certificate };
