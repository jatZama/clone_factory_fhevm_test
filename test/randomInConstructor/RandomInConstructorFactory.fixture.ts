import { ethers } from "hardhat";

import type { RandomInConstructorFactory } from "../../types";
import { getSigners } from "../signers";

export async function deployRandomInConstructorFactoryFixture(): Promise<RandomInConstructorFactory> {
  const signers = await getSigners();

  const contractFactory = await ethers.getContractFactory("RandomInConstructorInitializable");
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  const cloneFactoryFactory = await ethers.getContractFactory("RandomInConstructorFactory");
  const cloneFactory = await cloneFactoryFactory.connect(signers.alice).deploy(await contract.getAddress());
  await cloneFactory.waitForDeployment();

  return cloneFactory;
}
