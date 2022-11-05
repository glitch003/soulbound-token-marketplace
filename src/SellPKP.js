import { MenuItem } from "@material-ui/core";
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

      <MenuItem onClick={handleSellWallet}>Sell</MenuItem>

  );
}
