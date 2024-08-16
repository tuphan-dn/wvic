import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('WVIC', () => {
  async function deployFixture() {
    const WVIC = await ethers.getContractFactory('WVIC')
    const wvic = await WVIC.deploy()
    const [owner] = await ethers.getSigners()
    const zero = 0n
    const one = ethers.parseEther('1')
    return { wvic, owner, zero, one }
  }

  it('wrap', async () => {
    const { wvic, owner, one } = await loadFixture(deployFixture)
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

  it('unwrap', async () => {
    const { wvic, owner, zero, one } = await loadFixture(deployFixture)
    await owner.sendTransaction({ to: wvic.target, value: one })
    console.log(await wvic.burn(zero))
    await expect(wvic.burn(one))
      .to.emit(wvic, 'Transfer')
      .withArgs(owner.address, ethers.ZeroAddress, one)
    expect(await wvic.balanceOf(owner.address)).to.equal(zero)
    expect(await wvic.totalSupply()).to.equal(zero)
  })
})
