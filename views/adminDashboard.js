
//below two lines to connect to the blockchain using INFURA
const url = 'https://ropsten.infura.io/v3/2263eef71b3f42e4bd6dc77debba5750';
var web3 = new Web3(new Web3.providers.HttpProvider(url));

// creating a contract instance
var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "uAddress",
				"type": "address"
			}
		],
		"name": "checkUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReport",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newhosp",
				"type": "address"
			}
		],
		"name": "registerHospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newUser",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "report",
				"type": "string"
			}
		],
		"name": "sendReport",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var contract = new web3.eth.Contract(abi,'0x3C1FB21A9B58E13796DbfAd83de1a2a07d53adA3');


function addHospital() {
	//show the modal here
	var addr = document.getElementById("addr").value; // or if there is any other way to get this address
	// might need to generate the address from the public key of the hospital if we dont save the address in the database
	let acc = web3.eth.accounts.privateKeyToAccount(
		"0x289B9F4000ECF1A5AD780C4DF83BEDA4DAD14A7EF6A0D87BEF5626206E9FBB38"
	);
	var wallet = web3.eth.accounts.wallet;

	wallet.add(acc);
	// encode the data for contract
	var encoded = contract.methods.registerHospital(addr).encodeABI();

	//create the transaction
	var tx = {
		to: contract._address, // contract address
		// chain : 'ropsten',
		gas: 1000000, // will find a way to get this value from the market prices
		gasPrice: 7000000000,
		data: encoded,
	};


     //Signing and sending the transaction
        web3.eth.accounts
			.signTransaction(tx, web3.eth.accounts.wallet[0].privateKey)
			.then((signed) => {
				web3.eth
					.sendSignedTransaction(signed.rawTransaction)
					.on("receipt", console.log); // this means transaction sent
                    // do the redirects now
		    });
	});
}