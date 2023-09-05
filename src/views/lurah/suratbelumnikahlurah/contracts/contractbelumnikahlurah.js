/* eslint-disable prettier/prettier */
import web3 from 'src/web3';

const contractAddress = '0xc2740D00C08477077c42af745f41BE4A23E5F0F7'; // Update with the deployed contract address

const abi = [
    {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "belumnikahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              }
            ],
            "internalType": "struct CrudBelumnikahlurah.Belumnikahlurah",
            "name": "_belumnikahlurah",
            "type": "tuple"
          }
        ],
        "name": "createBelumnikah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_belumnikahlurahId",
            "type": "uint256"
          }
        ],
        "name": "deleteBelumnikahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_belumnikahlurahId",
            "type": "uint256"
          }
        ],
        "name": "getBelumnikahlurah",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "belumnikahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              }
            ],
            "internalType": "struct CrudBelumnikahlurah.Belumnikahlurah",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalBelumnikahlurahs",
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
            "name": "_belumnikahlurahId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "belumnikahlurahId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "userId",
                "type": "string"
              }
            ],
            "internalType": "struct CrudBelumnikahlurah.Belumnikahlurah",
            "name": "_updatedBelumnikahlurah",
            "type": "tuple"
          }
        ],
        "name": "updateBelumnikahlurah",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const contractbelumnikahlurah = new web3.eth.Contract(abi, contractAddress);

export default contractbelumnikahlurah;
