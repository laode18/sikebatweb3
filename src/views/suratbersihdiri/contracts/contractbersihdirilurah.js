/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x49ED00Da8bF6226d7c5C5b4309BCaf0585798e1C'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdirilurahId",
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
          }
        ],
        "internalType": "struct CrudBersihdirilurah.Bersihdirilurah",
        "name": "_bersihdirilurah",
        "type": "tuple"
      }
    ],
    "name": "createBersihdirilurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdirilurahId",
        "type": "uint256"
      }
    ],
    "name": "deleteBersihdirilurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdirilurahId",
        "type": "uint256"
      }
    ],
    "name": "getBersihdirilurah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdirilurahId",
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
          }
        ],
        "internalType": "struct CrudBersihdirilurah.Bersihdirilurah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBersihdirilurahs",
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
        "name": "_bersihdirilurahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdirilurahId",
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
          }
        ],
        "internalType": "struct CrudBersihdirilurah.Bersihdirilurah",
        "name": "_updatedBersihdirilurah",
        "type": "tuple"
      }
    ],
    "name": "updateBersihdirilurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractbersihdirilurah = new web3.eth.Contract(abi, contractAddress);

export default contractbersihdirilurah;
