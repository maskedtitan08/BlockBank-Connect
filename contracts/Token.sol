// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

    address public minter;     // we will give this minter role to the bank so that bank can issue tokens to user 


    event MinterChnaged(address indexed from,address to);

    constructor() payable ERC20("dBankCurrency","SGDB"){
        minter=msg.sender;  // only for initial then we will change to bank
    }

    modifier onlyOwner(){
        require (minter==msg.sender,"Only Owner can perform this operation");
        _;
    }

    function passMinterRole(address dBank) public onlyOwner() returns(bool){
        minter = dBank;
        emit  MinterChnaged(msg.sender,dBank);
        return true;
    }

    function mint(address _account,uint256 _amount) public onlyOwner{
        _mint(_account,_amount);       //initial supply is 0 but when we mint an amount of tokens it get added to totalsupply
    }
} 