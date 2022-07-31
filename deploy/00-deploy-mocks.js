const { developmentNetworks, DECIMALS, INITIAL_ANSWER } = require('../helper-hardhat-config')
const { network } = require('hardhat')
module.exports = async (hre) => {
	const { getNamedAccounts, deployments } = hre
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	if (developmentNetworks.includes(network.name)) {
		log('Local deploying mock')
		const fundMe = await deploy('MockV3Aggregator', {
			from: deployer,
			args: [DECIMALS, INITIAL_ANSWER], // price feed here
			log: true,
		})
		log('deployed mock completed')
		log('--------------------------------------')
	}

	// use mock when using local or hardhat network
}

module.exports.tags = ['all', 'mocks']
