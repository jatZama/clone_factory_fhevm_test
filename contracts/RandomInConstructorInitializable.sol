// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract RandomInConstructorInitializable is Initializable{
    euint32 private random;

    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer{
        random = TFHE.rem(TFHE.randEuint32(),100);
    }

    // Returns the name of the token.
    function result() public view virtual returns (uint32) {
        return TFHE.decrypt(random);
    }

}
