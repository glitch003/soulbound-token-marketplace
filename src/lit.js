import { ethers } from "ethers";
import pkpNftJson from "./abis/PKPNFT.json";
import { getAllNftsOwnedByAddress } from "./utils";

export const litContractAddresses = {
  stakingContractAddress: "0x091e9b0a5A404A394377d08C0Fd8C3418075e1fe",
  multisenderContractAddress: "0x1D907ec0CE55E7E3164Da56e50D64DC2d8933142",
  litTokenContractAddress: "0x541C8a3D27643002fb8A37dCf42D22940B5b2F51",
  accessControlConditionsContractAddress:
    "0x6620A0e03Ca33a3818f1539DF94f9807b12B9Ec2",
  pubkeyRouterContractAddress: "0xEA287AF8d8835eb20175875e89576bf583539B37",
  pkpNftContractAddress: "0x86062B7a01B8b2e22619dBE0C15cbe3F7EBd0E92",
  rateLimitNftContractAddress: "0xE094c76Ec6bad7CbA6181C8b34Bc41faC7EbdF43",
  pkpHelperContractAddress: "0xffD53EeAD24a54CA7189596eF1aa3f1369753611",
  pkpPermissionsContractAddress: "0x274d0C69fCfC40f71E57f81E8eA5Bd786a96B832",
  pkpNftMetadataContractAddress: "0x46c568B561Cde9ded66Be7d8044C141481c74d0f",
  chainId: 80001,
  rpcUrl:
    "https://polygon-mumbai.g.alchemy.com/v2/onvoLvV97DDoLkAmdi0Cj7sxvfglKqDh",
  chainName: "mumbai",
  litNodeDomainName: "127.0.0.1",
  litNodePort: 7470,
  rocketPort: 7470,
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

export const getOpenseaUrl = ({ tokenId }) => {
  return `https://testnets.opensea.io/assets/mumbai/${
    litContractAddresses.pkpNftContractAddress
  }/${tokenId.toString()}`;
};

export const getOwnedPKPs = async ({ signer }) => {
  const pkpContract = getPkpContract({ signer });

  let account = await signer.getAddress();
  console.log("account: ", account);

  const balance = (await pkpContract.balanceOf(account)).toNumber();
  const pkps = [];
  for (let i = 0; i < balance; i++) {
    console.log(`getting owned pkp ${i + 1} of ${balance}`);
    const tokenId = await pkpContract.tokenOfOwnerByIndex(account, i);
    const ethAddress = await pkpContract.getEthAddress(tokenId);
    // console.log("token id int is", tokenId.toString());
    const openseaUrl = getOpenseaUrl({ tokenId });
    const nftsThisWalletOwns = await getAllNftsOwnedByAddress({ ethAddress });
    pkps.push({ tokenId, ethAddress, openseaUrl, nftsThisWalletOwns });
  }
  console.log("owned PKPs", pkps);
  return pkps;
};

export const getAllPKPs = async ({ signer }) => {
  const pkpContract = getPkpContract({ signer });
  const pkpCount = (await pkpContract.totalSupply()).toNumber();
  const pkps = [];
  for (let i = 0; i < pkpCount; i++) {
    console.log(`getting all pkps ${i + 1} of ${pkpCount}`);
    const tokenId = await pkpContract.tokenByIndex(i);
    const ethAddress = await pkpContract.getEthAddress(tokenId);
    const openseaUrl = getOpenseaUrl({ tokenId });
    const nftsThisWalletOwns = await getAllNftsOwnedByAddress({ ethAddress });
    pkps.push({ tokenId, ethAddress, openseaUrl, nftsThisWalletOwns });
  }
  console.log("all PKPs", pkps);
  return pkps;
};

export const getOpenseaUrlForAnyNft = ({ contractAddress, tokenId }) => {
  return `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId.toString()}`;
};
