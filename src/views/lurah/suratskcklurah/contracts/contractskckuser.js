/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xBfe035089EAdee9f21350d96b88D73266b66455a'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "skckuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudSkckuser.Skckuser",
        "name": "_skckuser",
        "type": "tuple"
      }
    ],
    "name": "createSkckuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_skckuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteSkckuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_skckuserId",
        "type": "uint256"
      }
    ],
    "name": "getSkckuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "skckuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudSkckuser.Skckuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSkckusers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_skckuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "skckuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudSkckuser.Skckuser",
        "name": "_updatedSkckuser",
        "type": "tuple"
      }
    ],
    "name": "updateSkckuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }   
];

const contractskckuser = new web3.eth.Contract(abi, contractAddress);

export default contractskckuser;
