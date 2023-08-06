// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  
  const token = await hre.ethers.deployContract("Token");
  await token.waitForDeployment();


  const dbank = await hre.ethers.deployContract("dBank",[token.target]);
  await dbank.waitForDeployment();
  

  console.log("DBank address deployed to:",dbank.target);
  console.log("Token contract deployed to :",token.target);


  // const [deployer] = await ethers.getSigners();

  // const transaction = await token.connect(deployer).passMinterRole(dbank.target);
  // await transaction.wait();
  // console.log(token.minter());

  const transaction = await token.passMinterRole(dbank.target);
  await transaction.wait();
  console.log("Minter  role has been changed to bank : ",await token.minter());
  // console.log("Token :",await dbank.token());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
