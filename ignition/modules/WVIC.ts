import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const WVICModule = buildModule('WVICModule', (m) => {
  const wvic = m.contract('WVIC', [])
  return { wvic }
})

export default WVICModule
