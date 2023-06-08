require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/eOX-0a3VKhnrlvM9Ly4HXQdoLyVG6Bci",
      accounts: ["55389c18c7d7570a7ff9ea1ee9244abbb471353c252917d37d483234edf90f31"],
    },
  },
};
