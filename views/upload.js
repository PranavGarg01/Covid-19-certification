//below library is only used for encryption and decryption
var EthCrypto = require("eth-crypto");

//below two lines to connect to the blockchain using INFURA
const url = "https://ropsten.infura.io/v3/2263eef71b3f42e4bd6dc77debba5750";
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



var pubKey;
var report;
var encr;
var ciph;
var addr;

// This function runs onClick of the button Submit in the upload.ejs file
// change this functionality as you want
function upload() {
	// storing all the form data in variables
	var name = document.getElementById("name").value;
	var admDate = document.getElementById("admDate").value;
	pubKey = document.getElementById("pubKey").value; // we dont need to ask the user for this
    // we retrieve it from out DB


	//generating the user address from its pubKey
	addr = EthCrypto.publicKey.toAddress(pubKey);

	// the report as an object
	report = {
		name: name,
		admDate: admDate,
	};
	//using stringify so that we can encrypt it and store as a string
	report = JSON.stringify(report);
    
    //calling the asynchronous function in this way. change if know a better way to do this.
    // but this works
    encryptt();
}

async function encryptt() {
	await EthCrypto.encryptWithPublicKey(
		pubKey, // publicKey
		report // message
	).then(function (result) {
		encr = result;
		//the final string variable is below
		ciph = EthCrypto.cipher.stringify(encr); //this has to be uploaded

		// encode the data for contract
		var encoded = contract.methods.sendReport(addr, ciph).encodeABI(); 

        //create the transaction
        var tx = {
			to: contract._address, // contract address
			// chain : 'ropsten',
			gas: 3000000, // will find a way to get this value from the market prices
			gasPrice : 7000000000,
            data: encoded,
		};
// eg private key of hospital
// i used it for testing
// so saved here if we might want to use it later

//0x3B875060BF4EBE55228079EB96AC53DB140AD5422395D29F560F4D0C5066E2B4

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
