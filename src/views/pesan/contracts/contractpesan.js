/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xb2F27b4aFD3AFF65eD4669B1F9e2a4A06227C16d'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pesanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiPesan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPesan.Pesan",
        "name": "_pesan",
        "type": "tuple"
      }
    ],
    "name": "createPesan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pesanId",
        "type": "uint256"
      }
    ],
    "name": "deletePesan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pesanId",
        "type": "uint256"
      }
    ],
    "name": "getPesan",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pesanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiPesan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPesan.Pesan",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalPesans",
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
        "name": "_pesanId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pesanId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggal",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "isiPesan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudPesan.Pesan",
        "name": "_updatedPesan",
        "type": "tuple"
      }
    ],
    "name": "updatePesan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractpesan = new web3.eth.Contract(abi, contractAddress);

export default contractpesan;
