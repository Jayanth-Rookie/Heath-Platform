const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("upload"); // Ensure this matches your Solidity contract name
  
  const upload = await Upload.deploy(); // Deploy contract
  await upload.waitForDeployment(); // Updated deployment method

  console.log("Contract deployed to:", await upload.getAddress());
}
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
