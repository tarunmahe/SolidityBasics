const { networkConfig, developmentNetworks, DECIMALS, INITIAL_ANSWER } = require('../helper-hardhat-config')
const { network } = require('hardhat')
const { verify } = require('../utils/verify')
module.exports = async (hre) => {
	const { getNamedAccounts, deployments } = hre
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const chainId = network.config.chainId
	let ethUsdPriceUsd
	if (developmentNetworks.includes(network.name)) {
		const ethUsfPriceAggregator = await deployments.get('MockV3Aggregator')
		ethUsdPriceAddress = ethUsfPriceAggregator.address
		log(`Address in mock: ${ethUsdPriceAddress}`)
	} else {
		ethUsdPriceAddress = networkConfig[chainId].ethUsdPriceUsd
	}
	log(`Address: ${ethUsdPriceAddress}`)
	const fundMe = await deploy('FundMe', {
		from: deployer,
		args: [ethUsdPriceAddress], // price feed here
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	})
	log('--------------------------------------')
	if (!developmentNetworks.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		await verify(fundMe.address, [ethUsdPriceAddress])
	}
	// use mock when using local or hardhat network
}

module.exports.tags = ['all', 'fundme']
