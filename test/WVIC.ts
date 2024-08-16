import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('WVIC', () => {
  const deployFixture = async () => {
    const WVIC = await ethers.getContractFactory('WVIC')
    const wvic = await WVIC.deploy()
    return { wvic }
  }

  it('wrap', async () => {
    const { wvic } = await loadFixture(deployFixture)
  })

  it('unwrap', async () => {
    const { wvic } = await loadFixture(deployFixture)
  })
})
