import { ethers } from "ethers";
import pkpNftJson from "./abis/PKPNFT.json";

const litContractAddresses = {
  stakingContractAddress: "0xA082cd2c3e6b96C1980EB6f7Db75704617F67d41",
  multisenderContractAddress: "0x26095A1CF9c84Ac136325b2792810AFFF5407B28",
  litTokenContractAddress: "0x1B22464798B95ff1830253369DbAf1ff40C45406",
  accessControlConditionsContractAddress:
    "0x5d25a199116614Af7EA4D468B459fFbE95E8d0c5",
  pubkeyRouterContractAddress: "0x824dbC8aa8a9fF89ff645A3cB4545b0cf211e38d",
  pkpNftContractAddress: "0x8BE80a3DFa4b82607F469bd0E63C9a4bc2b277A9",
  rateLimitNftContractAddress: "0x9Baf4dB90c0A2dE23675D97632407F2ecef27e04",
  pkpHelperContractAddress: "0xDBc1F63645FDAa279854dDE26589f29806462419",
  pkpPermissionsContractAddress: "0x6Dd9E90Ab7A3AB0984D18746066341458c3C8a47",
  chainId: 80001,
  chainName: "mumbai",
};

const getPkpContract = ({ signer }) => {
  return new ethers.Contract(
    litContractAddresses.pkpNftContractAddress,
    pkpNftJson.abi,
    signer
  );
};

export const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  let account = await signer.getAddress();
  console.log("account: ", account);

  return signer;
};

export const mintPKP = async ({ signer }) => {
  const pkpContract = getPkpContract({ signer });

  // just to see how many PKPs there are that can be minted.  it returned like 900 something
  // so we probably don't need to check this anytime soon so that's why it's commented out.
  // const unmintedPKPs = await pkpContract.getUnmintedRoutedTokenIdCount(2);
  // console.log("unmintedPKPs", unmintedPKPs);

  const mintCost = await pkpContract.mintCost();

  const mintTx = await pkpContract.mintNext(2, { value: mintCost });
  console.log("mintTx", mintTx);
  const receipt = await mintTx.wait();

  return receipt;
};

export const getEthAddress = ({ tokenId, signer }) => {
  const pkpContract = getPkpContract({ signer });
  return pkpContract.getEthAddress(tokenId);
};

export const sendPKP = async ({ signer, toAddress, tokenId }) => {
  const pkpContract = getPkpContract({ signer });

  let account = await signer.getAddress();
  console.log("account: ", account);

  console.log(
    "Sending PKP to: ",
    toAddress,
    " with tokenId: ",
    tokenId,
    " from account: ",
    account
  );

  const sendTx = await pkpContract["safeTransferFrom(address,address,uint256)"](
    account,
    toAddress,
    tokenId
  );
  const sendReceipt = await sendTx.wait();
  return sendReceipt;
};

export const getOwnedPKPs = async ({ signer }) => {
  const pkpContract = getPkpContract({ signer });

  let account = await signer.getAddress();
  console.log("account: ", account);

  const balance = (await pkpContract.balanceOf(account)).toNumber();
  const pkps = [];
  for (let i = 0; i < balance; i++) {
    const tokenId = await pkpContract.tokenOfOwnerByIndex(account, i);
    const ethAddress = await pkpContract.getEthAddress(tokenId);
    pkps.push({ tokenId, ethAddress });
  }
  return pkps;
};
