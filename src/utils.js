import axios from "axios";

export const getAllNftsOwnedByAddress = async ({ ethAddress }) => {
  const url = `https://polygon-mumbai.g.alchemy.com/nft/v2/XhjFg58vOLFVFe51wz5pLaGusUWWLYyE/getNFTs?owner=${ethAddress}&withMetadata=true`;
  const resp = await axios.get(url);
  console.log("resp", resp.data);
  return resp.data;
};


export const tuncateWalletAddress = address => {
  if(!address)
  {
    return ""
  }

  return address.substring(0,3) + "..." + address.slice(-4)
}