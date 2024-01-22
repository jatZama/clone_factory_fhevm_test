import { ethers } from "hardhat";

import type { RandomInConstructor } from "../../types";
import { getSigners } from "../signers";

export async function deployRandomInConstructorFixture(): Promise<RandomInConstructor> {
  const signers = await getSigners();

  const contractFactory = await ethers.getContractFactory("RandomInConstructor");
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  return contract;
}
