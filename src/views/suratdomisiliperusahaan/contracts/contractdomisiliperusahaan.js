/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x16d5b1D01547A7dC4453119D15991127F0db66A3'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanId",
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
          },
          {
            "internalType": "string",
            "name": "aktaNotaris",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaan.Domisiliperusahaan",
        "name": "_domisiliperusahaan",
        "type": "tuple"
      }
    ],
    "name": "createDomisiliperusahaan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanId",
        "type": "uint256"
      }
    ],
    "name": "deleteDomisiliperusahaan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliperusahaanId",
        "type": "uint256"
      }
    ],
    "name": "getDomisiliperusahaan",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanId",
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
          },
          {
            "internalType": "string",
            "name": "aktaNotaris",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaan.Domisiliperusahaan",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDomisiliperusahaans",
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
        "name": "_domisiliperusahaanId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliperusahaanId",
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
          },
          {
            "internalType": "string",
            "name": "aktaNotaris",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "letterNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CrudDomisiliperusahaan.Domisiliperusahaan",
        "name": "_updatedDomisiliperusahaan",
        "type": "tuple"
      }
    ],
    "name": "updateDomisiliperusahaan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }        
];

const contractdomisiliperusahaan = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliperusahaan;
