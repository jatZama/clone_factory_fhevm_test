// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import { RandomInConstructorInitializable } from "./RandomInConstructorInitializable.sol";

contract RandomInConstructorFactory{
    address private immutable implementation;
    
    constructor(address _implementation) {
        implementation = _implementation;
    }

    function clone(bytes32 salt) public returns (address cloneAdd){
        cloneAdd = Clones.cloneDeterministic(implementation,salt);
        RandomInConstructorInitializable(cloneAdd).initialize();
    }

    function predictAddress(bytes32 salt) public view returns (address predicted){
        predicted = Clones.predictDeterministicAddress(implementation,salt);
    }
}