import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { mintPKP, getEthAddress, getSigner } from "./lit";

export default function GetPKP() {
  const [ethAddress, setEthAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGetWallet = async () => {
    const signer = await getSigner();

    setLoading(true);

    const mintingReceipt = await mintPKP({ signer });
    console.log("mintingReceipt", mintingReceipt);
    const tokenIdFromEvent = mintingReceipt.events[1].topics[3];
    console.log("tokenId is ", tokenIdFromEvent);
    setTokenId(tokenIdFromEvent);
    const ethAddress = await getEthAddress({
      tokenId: tokenIdFromEvent,
      signer,
    });
    console.log("eth address is", ethAddress);
    setEthAddress(ethAddress);

    setLoading(false);
  };

  return (
    <div>
      <h3>Get a wallet to use to hold your soulbound tokens</h3>
      <button onClick={handleGetWallet} disabled={loading}>
        Create Walet
      </button>
      {loading ? <h3>Loading....</h3> : null}
      {ethAddress ? (
        <>
          <h3>Wallet minted! The ETH address is {ethAddress}</h3>
        </>
      ) : null}
    </div>
  );
}
