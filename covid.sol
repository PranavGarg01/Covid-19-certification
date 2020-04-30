pragma solidity ^0.6.1;

contract covit {
    address owner;//the app owner, so that only he can assign hospitals the permission to upload records
   // uint8 _hCount=0;//hospital index
    
    // mapping (uint8 => address) user;
    mapping(address => bool) private hospitals;
    mapping(address => string) user;
    constructor() public {
        owner = msg.sender;//initialising it with the address of the app owner
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier onlyHospital {
        require(hospitals[msg.sender]);
        _;
    }
    modifier onlyUser {
        require(keccak256(abi.encodePacked(user[msg.sender]))!= keccak256(abi.encodePacked("")));
        _;
    }
    function registerHospital(address newhosp) external onlyOwner { //learn more about external, bcz it may be wrong
        hospitals[newhosp] = true;// new hospital registered
     //   _hCount+=1;
        //Hospital registered sent event here
    }
    function  sendReport(address newUser,string calldata report) external onlyHospital {//function works only if a registered hospital sends the Report 
        //report is already encrypted
        user[newUser] = report;
        //Hospital uploaded a report event here
    }
    function getReport()external view onlyUser returns (string memory) {
        return user[msg.sender];
    }
    function checkUser(address uAddress)public view returns (bool){
        if(keccak256(abi.encodePacked(user[uAddress]))!= keccak256(abi.encodePacked("")))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
}