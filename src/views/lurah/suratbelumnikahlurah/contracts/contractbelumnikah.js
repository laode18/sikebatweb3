/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x1D1a14428a72bb538AcC896E16D9ED086613760f'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBelumnikah.Belumnikah",
        "name": "_belumnikah",
        "type": "tuple"
      }
    ],
    "name": "createBelumnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_belumnikahId",
        "type": "uint256"
      }
    ],
    "name": "deleteBelumnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_belumnikahId",
        "type": "uint256"
      }
    ],
    "name": "getBelumnikah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBelumnikah.Belumnikah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBelumnikahs",
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
        "name": "_belumnikahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "belumnikahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBelumnikah.Belumnikah",
        "name": "_updatedBelumnikah",
        "type": "tuple"
      }
    ],
    "name": "updateBelumnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractbelumnikah = new web3.eth.Contract(abi, contractAddress);

export default contractbelumnikah;
