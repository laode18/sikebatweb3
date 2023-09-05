/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0x4ef19d39F98643Ef80f22BCB6F988B5c7bCC746d'; // Update with the deployed contract address

const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kelahiranuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAnak",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggalLahir",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisKelamin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "anakKe",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamLahir",
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
        "internalType": "struct CrudKelahiranuser.Kelahiranuser",
        "name": "_kelahiranuser",
        "type": "tuple"
      }
    ],
    "name": "createKelahiranuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kelahiranuserId",
        "type": "uint256"
      }
    ],
    "name": "deleteKelahiranuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kelahiranuserId",
        "type": "uint256"
      }
    ],
    "name": "getKelahiranuser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kelahiranuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAnak",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggalLahir",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisKelamin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "anakKe",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamLahir",
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
        "internalType": "struct CrudKelahiranuser.Kelahiranuser",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalKelahiranusers",
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
        "name": "_kelahiranuserId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "kelahiranuserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAyah",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaIbu",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "namaAnak",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tanggalLahir",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "jenisKelamin",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "anakKe",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "jamLahir",
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
        "internalType": "struct CrudKelahiranuser.Kelahiranuser",
        "name": "_updatedKelahiranuser",
        "type": "tuple"
      }
    ],
    "name": "updateKelahiranuser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractkelahiranuser = new web3.eth.Contract(abi, contractAddress);

export default contractkelahiranuser;
