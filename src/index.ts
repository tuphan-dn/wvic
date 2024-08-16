import {
  Contract,
  type ContractTransactionResponse,
  type TransactionResponse,
  type ContractRunner,
} from 'ethers'

import abi from '../abi/WVIC.json'

export const ADDRESS = '0x'

export class WVIC {
  public contract: Contract

  constructor(wallet: ContractRunner, contractAddress = ADDRESS) {
    this.contract = new Contract(contractAddress, abi, wallet)
  }

  async wrap(value: bigint): Promise<TransactionResponse> {
    const sendTransaction =
      this.contract.runner?.sendTransaction ||
      this.contract.runner?.provider?.sendTransaction
    if (!sendTransaction) throw new Error('Not connected wallet')
    return sendTransaction({
      to: this.contract.target,
      value,
    })
  }

  async unwrap(value: bigint): Promise<ContractTransactionResponse> {
    return this.contract.burn(value)
  }
}
