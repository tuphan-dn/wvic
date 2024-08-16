// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract WVIC is ERC20 {
  constructor() ERC20('Wrapped Viction', 'WVIC') {}

  receive() external payable {
    _mint(msg.sender, msg.value);
  }

  fallback() external payable {
    _mint(msg.sender, msg.value);
  }

  function burn(uint256 value) public returns (bool) {
    _burn(msg.sender, value);
    payable(msg.sender).transfer(value);
    return true;
  }
}
