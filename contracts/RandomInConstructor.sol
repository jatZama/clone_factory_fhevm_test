// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";

contract RandomInConstructor {
    euint32 private random;

    constructor() {
        random = TFHE.rem(TFHE.randEuint32(),100);
    }

    // Returns the name of the token.
    function result() public view virtual returns (uint32) {
        return TFHE.decrypt(random);
    }

}
