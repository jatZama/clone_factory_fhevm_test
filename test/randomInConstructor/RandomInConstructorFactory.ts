import { ethers } from "hardhat";

import { createInstances } from "../instance";
import { getSigners, initSigners } from "../signers";
import { deployRandomInConstructorFactoryFixture } from "./RandomInConstructorFactory.fixture";

describe("RandomInConstructorFactory", function () {
  before(async function () {
    await initSigners();
    this.signers = await getSigners();
  });

  beforeEach(async function () {
    const contract = await deployRandomInConstructorFactoryFixture();
    this.contractAddress = await contract.getAddress();
    this.factory = contract;
    this.instances = await createInstances(this.contractAddress, ethers, this.signers);
  });

  it("Random in constructor of a Clone", async function () {
    const tx = await this.factory.clone("0xf172873c63909462ac4de545471fd3ad3e9eeadeec4608b92d16ce6b500704cc")
    await tx.wait();
    const cloneAddress = await this.factory.predictAddress("0xf172873c63909462ac4de545471fd3ad3e9eeadeec4608b92d16ce6b500704cc")
    const clone = await ethers.getContractAt("RandomInConstructorInitializable", cloneAddress);
    console.log(await clone.result());
  });

});
