//below library is only used for encryption and decryption
var EthCrypto = require('eth-crypto');

//below two lines to connect to the blockchain using INFURA
const url = 'https://ropsten.infura.io/v3/2263eef71b3f42e4bd6dc77debba5750';
var web3 = new Web3(new Web3.providers.HttpProvider(url));

// This function runs onClick of the button Submit in the userSignUp.ejs file
// change this functionality as you want
// but this is the function to create the wallet and add an account to it
function createAccount() {
    var pwd = document.getElementById("pwd").value; // the password from the form

    var userName = document.getElementById("username").value; // get the username from the form
    
    web3.eth.accounts.wallet.clear();//this will always clear the wallet even if you have any accounts
    
    web3.eth.accounts.wallet.create(1); // creates 1 account with random values
    
    web3.eth.accounts.wallet.save(pwd);//,username);//saves wallet with encryption key as password 
    //and the key to access the storage is username of the user
    // so that when the user tries to login, we can search for the user's wallet and load it in :)


    //this below lines are just to help you show the methods user to get the keys and address of the account
    //@Sarthak use these to store the public key and address into the database.
    document.getElementById("prvKey").innerHTML  = web3.eth.accounts.wallet[0].privateKey;
    document.getElementById("pubKey").innerHTML  = EthCrypto.publicKeyByPrivateKey(web3.eth.accounts.wallet[0].privateKey);
    document.getElementById("addr").innerHTML  = web3.eth.accounts.wallet[0].address;
    console.log(web3.eth.accounts.wallet[0]);
}

