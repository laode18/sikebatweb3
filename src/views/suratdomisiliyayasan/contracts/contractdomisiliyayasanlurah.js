/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xe642785794F09957d9A998E7AB4366eB75e9B598'; // Update with the deployed contract address

const abi = [
{
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "domisiliyayasanlurahId",
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
            }
          ],
          "internalType": "struct CrudDomisiliyayasanlurah.Domisiliyayasanlurah",
          "name": "_domisiliyayasanlurah",
          "type": "tuple"
        }
      ],
      "name": "createDomisiliyayasanlurah",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_domisiliyayasanlurahId",
          "type": "uint256"
        }
      ],
      "name": "deleteDomisiliyayasanlurah",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_domisiliyayasanlurahId",
          "type": "uint256"
        }
      ],
      "name": "getDomisiliyayasanlurah",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "domisiliyayasanlurahId",
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
            }
          ],
          "internalType": "struct CrudDomisiliyayasanlurah.Domisiliyayasanlurah",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalDomisiliyayasanlurahs",
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
          "name": "_domisiliyayasanlurahId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "domisiliyayasanlurahId",
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
            }
          ],
          "internalType": "struct CrudDomisiliyayasanlurah.Domisiliyayasanlurah",
          "name": "_updatedDomisiliyayasanlurah",
          "type": "tuple"
        }
      ],
      "name": "updateDomisiliyayasanlurah",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const contractdomisiliyayasanlurah = new web3.eth.Contract(abi, contractAddress);

export default contractdomisiliyayasanlurah;
