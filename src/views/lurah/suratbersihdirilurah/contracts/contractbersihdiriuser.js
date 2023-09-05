/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x69647c17732d8C4EaaB88e1c2f23bcbe72a04f2E'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriuserId",
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
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiriuser.Bersihdiriuser",
        "name": "_bersihdiriuser",
        "type": "tuple"
      }
    ],
    "name": "createBersihdiriuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdiriuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteBersihdiriuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bersihdiriuserId",
        "type": "uint256"
      }
    ],
    "name": "getBersihdiriuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriuserId",
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
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiriuser.Bersihdiriuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBersihdiriusers",
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
        "name": "_bersihdiriuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "bersihdiriuserId",
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
            "name": "walletId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaDocument",
            "type": "string"
          }
        ],
        "internalType": "struct CrudBersihdiriuser.Bersihdiriuser",
        "name": "_updatedBersihdiriuser",
        "type": "tuple"
      }
    ],
    "name": "updateBersihdiriuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractbersihdiriuser = new web3.eth.Contract(abi, contractAddress);

export default contractbersihdiriuser;
