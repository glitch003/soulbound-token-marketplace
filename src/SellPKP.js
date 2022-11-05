import { useEffect, useState } from "react";
import { getSigner, litContractAddresses } from "./lit";

export default function SellPKP(props) {
  const { tokenId } = props;

  const handleSellWallet = async () => {
    const url = `https://testnets.opensea.io/assets/mumbai/${
      litContractAddresses.pkpNftContractAddress
    }/${tokenId.toString()}/sell`;
    window.open(url);
  };
  return (
    <div>
      <button onClick={handleSellWallet}>Sell Wallet</button>
    </div>
  );
}
