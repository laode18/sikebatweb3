/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x2FA4b6AD8481763BfFAfE03B328660f1b7df8A37'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahaId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudMempunyaiusaha.Mempunyaiusaha",
        "name": "_mempunyaiusaha",
        "type": "tuple"
      }
    ],
    "name": "createMempunyaiusaha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mempunyaiusahaId",
        "type": "uint256"
      }
    ],
    "name": "deleteMempunyaiusaha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mempunyaiusahaId",
        "type": "uint256"
      }
    ],
    "name": "getMempunyaiusaha",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahaId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudMempunyaiusaha.Mempunyaiusaha",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalMempunyaiusahas",
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
        "name": "_mempunyaiusahaId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "mempunyaiusahaId",
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
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudMempunyaiusaha.Mempunyaiusaha",
        "name": "_updatedMempunyaiusaha",
        "type": "tuple"
      }
    ],
    "name": "updateMempunyaiusaha",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }     
];

const contractmempunyaiusaha = new web3.eth.Contract(abi, contractAddress);

export default contractmempunyaiusaha;
