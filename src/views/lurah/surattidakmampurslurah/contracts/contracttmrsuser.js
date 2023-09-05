/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xc5Fa0ce38249D068D5DF83965C8a93d57ECBD2E1'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmrsuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noJamkesmas",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaRs",
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
        "internalType": "struct CrudTmrsuser.Tmrsuser",
        "name": "_tmrsuser",
        "type": "tuple"
      }
    ],
    "name": "createTmrsuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmrsuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteTmrsuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tmrsuserId",
        "type": "uint256"
      }
    ],
    "name": "getTmrsuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmrsuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noJamkesmas",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaRs",
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
        "internalType": "struct CrudTmrsuser.Tmrsuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTmrsusers",
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
        "name": "_tmrsuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tmrsuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "noJamkesmas",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaOrangtua",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaRs",
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
        "internalType": "struct CrudTmrsuser.Tmrsuser",
        "name": "_updatedTmrsuser",
        "type": "tuple"
      }
    ],
    "name": "updateTmrsuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contracttmrsuser = new web3.eth.Contract(abi, contractAddress);

export default contracttmrsuser;
