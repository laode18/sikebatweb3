/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x787665dD55Aab897F80a74dF00CefFeB1E0f0E9b'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "mempunyaiusahalurahId",
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
              }
            ],
            "internalType": "struct CrudMempunyaiusahalurah.Mempunyaiusahalurah",
            "name": "_mempunyaiusahalurah",
            "type": "tuple"
          }
        ],
        "name": "createMempunyaiusahalurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_mempunyaiusahalurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteMempunyaiusahalurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_mempunyaiusahalurahId",
            "type": "uint256"
          }
        ],
        "name": "getMempunyaiusahalurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "mempunyaiusahalurahId",
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
              }
            ],
            "internalType": "struct CrudMempunyaiusahalurah.Mempunyaiusahalurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalMempunyaiusahalurahs",
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
            "name": "_mempunyaiusahalurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "mempunyaiusahalurahId",
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
              }
            ],
            "internalType": "struct CrudMempunyaiusahalurah.Mempunyaiusahalurah",
            "name": "_updatedMempunyaiusahalurah",
            "type": "tuple"
          }
        ],
        "name": "updateMempunyaiusahalurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractmempunyaiusahalurah = new web3.eth.Contract(abi, contractAddress);

export default contractmempunyaiusahalurah;
