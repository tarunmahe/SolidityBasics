const networkConfig = {
	4: {
		name: 'rinkeby',
		ethUsdPriceUsd: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
	},
	// 31337
}
const developmentNetworks = ['hardhat', 'localhost']

const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
	networkConfig,
	developmentNetworks,
	DECIMALS,
	INITIAL_ANSWER,
}
