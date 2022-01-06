import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const ether_value = ethers.BigNumber.from(document.getElementById("ether").value);
  const value = ether_value * 10**18;
  const contract = await deploy(beneficiary, value);
  addContract(++contracts, contract, beneficiary, value);
}

document.getElementById("deploy").addEventListener("click", newContract);
