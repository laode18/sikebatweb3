/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xE9345a5a8Ac90B006D1530B6bB07321641ed0359'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanuserId",
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
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudDomisiliyayasanuser.Domisiliyayasanuser",
        "name": "_domisiliyayasanuser",
        "type": "tuple"
      }
    ],
    "name": "createDomisiliyayasanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliyayasanuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteDomisiliyayasanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_domisiliyayasanuserId",
        "type": "uint256"
      }
    ],
    "name": "getDomisiliyayasanuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanuserId",
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
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudDomisiliyayasanuser.Domisiliyayasanuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDomisiliyayasanusers",
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
        "name": "_domisiliyayasanuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "domisiliyayasanuserId",
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
            "internalType": "uint256",
            "name": "jumlahAnggota",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamKerja",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "alamatUsaha",
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
        "internalType": "struct CrudDomisiliyayasanuser.Domisiliyayasanuser",
        "name": "_updatedDomisiliyayasanuser",
        "type": "tuple"
      }
    ],
    "name": "updateDomisiliyayasanuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }    
];

const contractdomisiliyayasanuser = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliyayasanuser;
