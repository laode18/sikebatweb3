/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x76aDE83b1327c7E601C4f56Ec3530F629442782e'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "skcklurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "keperluan",
                "type": "string"
              }
            ],
            "internalType": "struct CrudSkcklurah.Skcklurah",
            "name": "_skcklurah",
            "type": "tuple"
          }
        ],
        "name": "createSkcklurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_skcklurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteSkcklurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_skcklurahId",
            "type": "uint256"
          }
        ],
        "name": "getSkcklurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "skcklurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "keperluan",
                "type": "string"
              }
            ],
            "internalType": "struct CrudSkcklurah.Skcklurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSkcklurahs",
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
            "name": "_skcklurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "skcklurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "keperluan",
                "type": "string"
              }
            ],
            "internalType": "struct CrudSkcklurah.Skcklurah",
            "name": "_updatedSkcklurah",
            "type": "tuple"
          }
        ],
        "name": "updateSkcklurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractskcklurah = new web3.eth.Contract(abi, contractAddress);

export default contractskcklurah;
