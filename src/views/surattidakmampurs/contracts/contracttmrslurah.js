/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x82316D443A50b7990C50182035a49ed3f0e509F9'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmrslurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "noJamkesmas",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaOrangtua",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaRs",
                "type": "string"
              }
            ],
            "internalType": "struct CrudTmrslurah.Tmrslurah",
            "name": "_tmrslurah",
            "type": "tuple"
          }
        ],
        "name": "createTmrslurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tmrslurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteTmrslurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tmrslurahId",
            "type": "uint256"
          }
        ],
        "name": "getTmrslurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmrslurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "noJamkesmas",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaOrangtua",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaRs",
                "type": "string"
              }
            ],
            "internalType": "struct CrudTmrslurah.Tmrslurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalTmrslurahs",
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
            "name": "_tmrslurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tmrslurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "noJamkesmas",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaOrangtua",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "namaRs",
                "type": "string"
              }
            ],
            "internalType": "struct CrudTmrslurah.Tmrslurah",
            "name": "_updatedTmrslurah",
            "type": "tuple"
          }
        ],
        "name": "updateTmrslurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contracttmrslurah = new web3.eth.Contract(abi, contractAddress);

export default contracttmrslurah;
