// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Token.sol";

contract dBank {
    Token private token;

    constructor(Token _token) {
        token = _token;
    }

    mapping(address => uint) public userBalance;
    mapping(address => uint) public depositStart;
    mapping(address => bool) public isDeposited;

    event Deposit(address indexed user, uint Amount, uint timeStart);

    function deposit() public payable {
        require(isDeposited[msg.sender] == false, "Deposit already active");
        require(msg.value >= 1e16, "Deposit amount must be >= 0.01 ETH");

        userBalance[msg.sender] += msg.value;
        depositStart[msg.sender] += block.timestamp;
        isDeposited[msg.sender] = true;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    event Withdraw(
        address indexed user,
        uint etherAmount,
        uint depositTime,
        uint interest
    );

    function withdraw() public {
        require(isDeposited[msg.sender] == true, "You have no active Deposit");
        uint userbalance = userBalance[msg.sender]; //for event

        uint depositTime = block.timestamp - depositStart[msg.sender];

        uint interestPerSecond = 31668017 * (userBalance[msg.sender] / 1e16);
        uint interest = interestPerSecond * depositTime;

        // msg.sender.call(userBalance[msg.sender]); // transferring userbalance
        (bool success,) = msg.sender.call{value : userbalance}("");
        require(success);
        token.mint(msg.sender, interest);  // mint interest tokens to use(msg,sender)

        depositStart[msg.sender] = 0;
        userBalance[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit Withdraw(msg.sender, userbalance, depositTime, interest);
    }
}
