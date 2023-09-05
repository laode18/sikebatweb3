/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xFb58B445620Deb548Df85ADC9597fc5433680026'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahuserId",
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
            "internalType": "struct CrudPindahuser.Pindahuser",
            "name": "_pindahuser",
            "type": "tuple"
          }
        ],
        "name": "createPindahuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pindahuserId",
            "type": "uint256"
          }
        ],
        "name": "deletePindahuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pindahuserId",
            "type": "uint256"
          }
        ],
        "name": "getPindahuser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahuserId",
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
            "internalType": "struct CrudPindahuser.Pindahuser",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalPindahusers",
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
            "name": "_pindahuserId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "pindahuserId",
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
            "internalType": "struct CrudPindahuser.Pindahuser",
            "name": "_updatedPindahuser",
            "type": "tuple"
          }
        ],
        "name": "updatePindahuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractpindahuser = new web3.eth.Contract(abi, contractAddress);

export default contractpindahuser;
