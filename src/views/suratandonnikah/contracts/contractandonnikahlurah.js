/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x8212aEd2268E5f7923FD2eDBBdA1deacBACDA6c9'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikahlurah.Andonnikahlurah",
        "name": "_andonnikahlurah",
        "type": "tuple"
      }
    ],
    "name": "createAndonnikahlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahlurahId",
        "type": "uint256"
      }
    ],
    "name": "deleteAndonnikahlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahlurahId",
        "type": "uint256"
      }
    ],
    "name": "getAndonnikahlurah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikahlurah.Andonnikahlurah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAndonnikahlurahs",
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
        "name": "_andonnikahlurahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPasangan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPasangan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikahlurah.Andonnikahlurah",
        "name": "_updatedAndonnikahlurah",
        "type": "tuple"
      }
    ],
    "name": "updateAndonnikahlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractandonnikahlurah = new web3.eth.Contract(abi, contractAddress);

export default contractandonnikahlurah;
