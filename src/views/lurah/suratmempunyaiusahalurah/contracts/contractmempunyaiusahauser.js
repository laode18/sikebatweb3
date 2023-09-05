/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xCeAEB2b02391690eE6Cb82eDbDF0422200175dAC'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahauserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudMempunyaiusahauser.Mempunyaiusahauser",
        "name": "_mempunyaiusahauser",
        "type": "tuple"
      }
    ],
    "name": "createMempunyaiusahauser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mempunyaiusahauserId",
        "type": "uint256"
      }
    ],
    "name": "deleteMempunyaiusahauser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mempunyaiusahauserId",
        "type": "uint256"
      }
    ],
    "name": "getMempunyaiusahauser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahauserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudMempunyaiusahauser.Mempunyaiusahauser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalMempunyaiusahausers",
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
        "name": "_mempunyaiusahauserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahauserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisUsaha",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudMempunyaiusahauser.Mempunyaiusahauser",
        "name": "_updatedMempunyaiusahauser",
        "type": "tuple"
      }
    ],
    "name": "updateMempunyaiusahauser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractmempunyaiusahauser = new web3.eth.Contract(abi, contractAddress);

export default contractmempunyaiusahauser;
