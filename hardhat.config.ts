import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-ignition'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-abi-exporter'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [':WVIC$'],
  },
}

export default config
