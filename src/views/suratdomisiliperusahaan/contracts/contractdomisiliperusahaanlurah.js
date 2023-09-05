/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xAd0D2EDAA90ba414a430F97e964c2EDf96e4B00a'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaanlurah.Domisiliperusahaanlurah",
        "name": "_domisiliperusahaanlurah",
        "type": "tuple"
      }
    ],
    "name": "createDomisiliperusahaanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanlurahId",
        "type": "uint256"
      }
    ],
    "name": "deleteDomisiliperusahaanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanlurahId",
        "type": "uint256"
      }
    ],
    "name": "getDomisiliperusahaanlurah",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaanlurah.Domisiliperusahaanlurah",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDomisiliperusahaanlurahs",
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
        "name": "_domisiliperusahaanlurahId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanlurahId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisPerusahaan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatPerusahaan",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaanlurah.Domisiliperusahaanlurah",
        "name": "_updatedDomisiliperusahaanlurah",
        "type": "tuple"
      }
    ],
    "name": "updateDomisiliperusahaanlurah",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }       
];

const contractdomisiliperusahaanlurah = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliperusahaanlurah;
