/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x415D2dDbe5c20d7D92a3D02d7C0D0eF5EF1a38D3'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiri.Bersihdiri",
        "name": "_bersihdiri",
        "type": "tuple"
      }
    ],
    "name": "createBersihdiri",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdiriId",
        "type": "uint256"
      }
    ],
    "name": "deleteBersihdiri",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdiriId",
        "type": "uint256"
      }
    ],
    "name": "getBersihdiri",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiri.Bersihdiri",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBersihdiris",
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
        "name": "_bersihdiriId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "keperluan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiri.Bersihdiri",
        "name": "_updatedBersihdiri",
        "type": "tuple"
      }
    ],
    "name": "updateBersihdiri",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractbersihdiri = new web3.eth.Contract(abi, contractAddress);

export default contractbersihdiri;
