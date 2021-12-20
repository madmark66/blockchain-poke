var Ethermon = artifacts.require("./Ethermon.sol");

module.exports = function(deployer) {
  deployer.deploy(Ethermon, "test", "tt");
};