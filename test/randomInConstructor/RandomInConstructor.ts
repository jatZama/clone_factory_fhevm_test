import { ethers } from "hardhat";

import { createInstances } from "../instance";
import { getSigners, initSigners } from "../signers";
import { deployRandomInConstructorFixture } from "./RandomInConstructor.fixture";

describe("RandomInConstructor", function () {
  before(async function () {
    await initSigners();
    this.signers = await getSigners();
  });

  beforeEach(async function () {
    const contract = await deployRandomInConstructorFixture();
    this.contractAddress = await contract.getAddress();
    this.random = contract;
    this.instances = await createInstances(this.contractAddress, ethers, this.signers);
  });

  it("Random in constructor", async function () {
    console.log(await this.random.result());
  });

});
