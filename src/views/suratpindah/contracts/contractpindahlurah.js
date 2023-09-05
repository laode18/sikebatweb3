/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x943EC48505A42103079441dfB5Ef05eE02740c72'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kotaTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kelurahanTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alamatTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rtTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rwTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alasanPindah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalPindah",
                "type": "string"
              }
            ],
            "internalType": "struct CrudPindahlurah.Pindahlurah",
            "name": "_pindahlurah",
            "type": "tuple"
          }
        ],
        "name": "createPindahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pindahlurahId",
            "type": "uint256"
          }
        ],
        "name": "deletePindahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pindahlurahId",
            "type": "uint256"
          }
        ],
        "name": "getPindahlurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kotaTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kelurahanTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alamatTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rtTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rwTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alasanPindah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalPindah",
                "type": "string"
              }
            ],
            "internalType": "struct CrudPindahlurah.Pindahlurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalPindahlurahs",
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
            "name": "_pindahlurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kotaTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "kelurahanTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alamatTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rtTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "rwTujuan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "alasanPindah",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "tanggalPindah",
                "type": "string"
              }
            ],
            "internalType": "struct CrudPindahlurah.Pindahlurah",
            "name": "_updatedPindahlurah",
            "type": "tuple"
          }
        ],
        "name": "updatePindahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractpindahlurah = new web3.eth.Contract(abi, contractAddress);

export default contractpindahlurah;
