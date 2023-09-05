/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xFB3C9402Be6f214CaB7D7f7C7709711BdB365E87'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukanlurah.Kependudukanlurah",
        "name": "_kependudukanlurah",
        "type": "tuple"
      }
    ],
    "name": "createKependudukanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kependudukanlurahId",
        "type": "uint256"
      }
    ],
    "name": "deleteKependudukanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kependudukanlurahId",
        "type": "uint256"
      }
    ],
    "name": "getKependudukanlurah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukanlurah.Kependudukanlurah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalKependudukanlurahs",
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
        "name": "_kependudukanlurahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kependudukanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudKependudukanlurah.Kependudukanlurah",
        "name": "_updatedKependudukanlurah",
        "type": "tuple"
      }
    ],
    "name": "updateKependudukanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractkependudukan = new web3.eth.Contract(abi, contractAddress);

export default contractkependudukan;
