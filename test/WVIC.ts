import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('WVIC', async function () {
  async function deployFixture() {
    const WVIC = await ethers.getContractFactory('WVIC')
    const wvic = await WVIC.deploy()
    const [owner] = await ethers.getSigners()
    const zero = 0n
    const one = ethers.parseEther('1')
    return { wvic, owner, zero, one }
  }

  describe('snapshot #1', async function () {
    let snapshot: Awaited<ReturnType<typeof deployFixture>>

    before(async () => {
      snapshot = await loadFixture(deployFixture)
    })

    it('wrap', async function () {
      const { wvic, owner, one } = snapshot
      await expect(
        owner.sendTransaction({
          to: wvic.target,
          value: one,
        }),
      )
        .to.emit(wvic, 'Transfer')
        .withArgs(ethers.ZeroAddress, owner.address, one)
      expect(await wvic.balanceOf(owner.address)).to.equal(one)
      expect(await wvic.totalSupply()).to.equal(one)
    })

    it('unwrap', async function () {
      const { wvic, owner, one, zero } = snapshot
      await expect(wvic.burn(one))
        .to.emit(wvic, 'Transfer')
        .withArgs(owner.address, ethers.ZeroAddress, one)
      expect(await wvic.balanceOf(owner.address)).to.equal(zero)
      expect(await wvic.totalSupply()).to.equal(zero)
    })
  })
})
