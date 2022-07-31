const { ethers, deployments, getNamedAccounts } = require('hardhat')
const { assert, expect } = require('chai')

describe('FundMe', async function () {
	let fundMe
	let deployer
	let mockV3Aggregator
	const sendValue = ethers.utils.parseEther('0.01')

	beforeEach(async () => {
		// const accounts = await ethers.getSigners()
		// deployer = accounts[0]
		deployer = (await getNamedAccounts()).deployer
		await deployments.fixture(['all'])
		fundMe = await ethers.getContract('FundMe', deployer)
		mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer)
	})

	describe('constructor', function () {
		it('sets the aggregator addresses correctly', async () => {
			const response = await fundMe.getPriceFeed()
			assert.equal(response, mockV3Aggregator.address)
		})
	})

	describe('fund', () => {
		it('Fails if you dont send enough ETH', async () => {
			await expect(fundMe.fund()).to.be.revertedWith('You need to spend more ETH!')
		})

		it('Updates the amount funded data structure', async () => {
			await fundMe.fund({ value: sendValue })
			const response = await fundMe.getAddressToAmountFunded(deployer)
			assert.equal(response.toString(), sendValue.toString())
		})

		it('Adds funds to array of funders', async () => {
			await fundMe.fund({ value: sendValue })
			const response = await fundMe.getFunder(0)
			assert.equal(response, deployer)
		})
	})
})
