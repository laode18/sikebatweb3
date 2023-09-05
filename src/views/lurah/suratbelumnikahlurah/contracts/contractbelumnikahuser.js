/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x3F51E7bC19A4e2FE91Ce15707402e5609907D74a'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
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
        "internalType": "struct CrudBelumnikahuser.Belumnikahuser",
        "name": "_belumnikahuser",
        "type": "tuple"
      }
    ],
    "name": "createBelumnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_belumnikahuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteBelumnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_belumnikahuserId",
        "type": "uint256"
      }
    ],
    "name": "getBelumnikahuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
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
        "internalType": "struct CrudBelumnikahuser.Belumnikahuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBelumnikahusers",
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
        "name": "_belumnikahuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
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
        "internalType": "struct CrudBelumnikahuser.Belumnikahuser",
        "name": "_updatedBelumnikahuser",
        "type": "tuple"
      }
    ],
    "name": "updateBelumnikahuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractbelumnikahuser = new web3.eth.Contract(abi, contractAddress);

export default contractbelumnikahuser;
