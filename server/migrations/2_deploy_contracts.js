const Cinnamon = artifacts.require('Cinnamon')
const Marketplace = artifacts.require('Marketplace')

module.exports = async function (deployer) {
  await deployer.deploy(Marketplace)
  const marketplace = await Marketplace.deployed()
  await deployer.deploy(Cinnamon, marketplace.address)
}
