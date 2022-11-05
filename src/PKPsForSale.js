import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import {
  litContractAddresses,
  getSigner,
  getAllPKPs,
  getOpenseaUrl,
} from "./lit";
import { Button, CircularProgress } from "@material-ui/core";

export default function PKPsForSale() {
  const [listings, setListings] = useState(null);
  useEffect(() => {
    const go = async () => {
      const signer = await getSigner();
      const allPkps = await getAllPKPs({ signer });
      const tokenIdsStr = allPkps
        .map((t) => "token_ids=" + t.tokenId.toString())
        .join("&");
      const url = `https://testnets-api.opensea.io/v2/orders/mumbai/seaport/listings?asset_contract_address=${litContractAddresses.pkpNftContractAddress}&${tokenIdsStr}`;
      const resp = await axios.get(url);
      console.log("listings:", resp.data);
      setListings(resp.data.orders);
    };
    go();
  }, []);
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"40px", width: 300}}>
        <h3>Liquid wallets listed for Sale</h3>
        <Button variant="contained" color="primary" onClick={() => window.open("https://testnets.opensea.io/collection/programmable-keypair-ea1lqt2ty1?search%5BsortAscending%5D=true&search%5BsortBy%5D=UNIT_PRICE&search%5Btoggles%5D%5B0%5D=BUY_NOW")}>View on OpenSea</Button>
      </div>
    </div>
  );
}
