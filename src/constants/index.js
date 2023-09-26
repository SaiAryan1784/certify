import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const NFT_CONTRACT_ADDRESS_2 =
  "0x878583fb71C72370079E252C5b8C2985Ef786412";
export const abi2 = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CertificateIssued",
    inputs: [
      {
        type: "uint256",
        name: "certificateId",
        indexed: true,
        internalType: "uint256",
      },
      {
        type: "address",
        name: "recipient",
        indexed: true,
        internalType: "address",
      },
      {
        type: "string",
        name: "certificateType",
        indexed: false,
        internalType: "string",
      },
      {
        type: "string",
        name: "dateOfIssue",
        indexed: false,
        internalType: "string",
      },
      {
        type: "string",
        name: "ipfsHash",
        indexed: false,
        internalType: "string",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "addIssuer",
    inputs: [
      {
        type: "address",
        name: "_newIssuer",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "certificateCounter",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "certificates",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "certificateId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
      },
      {
        type: "address",
        name: "issuer",
        internalType: "address",
      },
      {
        type: "string",
        name: "certificateType",
        internalType: "string",
      },
      {
        type: "string",
        name: "dateOfIssue",
        internalType: "string",
      },
      {
        type: "string",
        name: "ipfsHash",
        internalType: "string",
      },
      {
        type: "bool",
        name: "revoked",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "certificatesByAddress",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "certificateId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
      },
      {
        type: "address",
        name: "issuer",
        internalType: "address",
      },
      {
        type: "string",
        name: "certificateType",
        internalType: "string",
      },
      {
        type: "string",
        name: "dateOfIssue",
        internalType: "string",
      },
      {
        type: "string",
        name: "ipfsHash",
        internalType: "string",
      },
      {
        type: "bool",
        name: "revoked",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "certificatesByHash",
    inputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "certificateId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
      },
      {
        type: "address",
        name: "issuer",
        internalType: "address",
      },
      {
        type: "string",
        name: "certificateType",
        internalType: "string",
      },
      {
        type: "string",
        name: "dateOfIssue",
        internalType: "string",
      },
      {
        type: "string",
        name: "ipfsHash",
        internalType: "string",
      },
      {
        type: "bool",
        name: "revoked",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractOwner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCertificate",
    inputs: [
      {
        type: "uint256",
        name: "_certificateId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "uint256",
            name: "certificateId",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "recipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "issuer",
            internalType: "address",
          },
          {
            type: "string",
            name: "certificateType",
            internalType: "string",
          },
          {
            type: "string",
            name: "dateOfIssue",
            internalType: "string",
          },
          {
            type: "string",
            name: "ipfsHash",
            internalType: "string",
          },
          {
            type: "bool",
            name: "revoked",
            internalType: "bool",
          },
        ],
        internalType: "struct certify.Certificate",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCertificateByAddress",
    inputs: [
      {
        type: "address",
        name: "_recipent",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "certificateId",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "recipient",
            internalType: "address",
          },
          {
            type: "address",
            name: "issuer",
            internalType: "address",
          },
          {
            type: "string",
            name: "certificateType",
            internalType: "string",
          },
          {
            type: "string",
            name: "dateOfIssue",
            internalType: "string",
          },
          {
            type: "string",
            name: "ipfsHash",
            internalType: "string",
          },
          {
            type: "bool",
            name: "revoked",
            internalType: "bool",
          },
        ],
        internalType: "struct certify.Certificate[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isAuthorizedIssuer",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "issueCertificate",
    inputs: [
      {
        type: "address",
        name: "_recipient",
        internalType: "address",
      },
      {
        type: "string",
        name: "_certificateType",
        internalType: "string",
      },
      {
        type: "string",
        name: "_dateOfIssue",
        internalType: "string",
      },
      {
        type: "string",
        name: "_ipfsHash",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validateCertificate",
    inputs: [
      {
        type: "string",
        name: "_ipfsHash",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
];
export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Certificate",
    imgUrl: createCampaign,
    link: "/UploadCertificate",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/Validate",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/Payment",
  },

  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/Logout",
  },
];
