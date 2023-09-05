/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xD9D9843c7b1B8cFD2872f075E5dE9E1345Bc9768'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kependudukanuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
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
            "internalType": "struct CrudKependudukanuser.Kependudukanuser",
            "name": "_kependudukanuser",
            "type": "tuple"
          }
        ],
        "name": "createKependudukanuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kependudukanuserId",
            "type": "uint256"
          }
        ],
        "name": "deleteKependudukanuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_kependudukanuserId",
            "type": "uint256"
          }
        ],
        "name": "getKependudukanuser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kependudukanuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
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
            "internalType": "struct CrudKependudukanuser.Kependudukanuser",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalKependudukanusers",
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
            "name": "_kependudukanuserId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "kependudukanuserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
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
            "internalType": "struct CrudKependudukanuser.Kependudukanuser",
            "name": "_updatedKependudukanuser",
            "type": "tuple"
          }
        ],
        "name": "updateKependudukanuser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractkependudukanuser = new web3.eth.Contract(abi, contractAddress);

export default contractkependudukanuser;
