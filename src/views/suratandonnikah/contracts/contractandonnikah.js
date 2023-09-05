/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xc75E3471D898c04758D0094dC55091a12673AA42'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahId",
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
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikah.Andonnikah",
        "name": "_andonnikah",
        "type": "tuple"
      }
    ],
    "name": "createAndonnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahId",
        "type": "uint256"
      }
    ],
    "name": "deleteAndonnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_andonnikahId",
        "type": "uint256"
      }
    ],
    "name": "getAndonnikah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahId",
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
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikah.Andonnikah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAndonnikahs",
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
        "name": "_andonnikahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "andonnikahId",
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
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudAndonnikah.Andonnikah",
        "name": "_updatedAndonnikah",
        "type": "tuple"
      }
    ],
    "name": "updateAndonnikah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractandonnikah = new web3.eth.Contract(abi, contractAddress);

export default contractandonnikah;
