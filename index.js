const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Page for the user to get his records
//get the data from the blockchain
//decrypts it using the user's private key
//for accessing the user private key, user needs to type his password.
//and once the cipher text has been decrypted it is displayed on the screen

app.get("/getMyRecords", (req, res) => {
	res.render("GetMyRecords");
});

//Page for the User Sign up
// This page generates a new account and stores it in the wallet and also encrypts
//it with your user password and stores it into the browser local storage
//so that on user login the user with this password can securely load his wallet
//and transact through his account

//for just an example and ease in merging : it displays all the keys.

app.get("/userSignUp", (req, res) => {
	res.render("userSignUp");
});

app.get("/upload", (req, res) => {
	res.render("upload");
});

app.get("/hospitalRegister", (req, res) => {
	res.render("hospitalRegister");
});

app.listen(5000, console.log("STARTED ON PORT 5000"));
