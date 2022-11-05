import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import {
  litContractAddresses,
  getSigner,
  getAllPKPs,
  getOpenseaUrl,
} from "./lit";

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
    <div>
      {listings
        ? listings.map((l) => (
            <div>
              Token Id {l.maker_asset_bundle.assets[0].token_id} is for sale for{" "}
              {ethers.utils.formatEther(l.current_price)}
              <a
                href={getOpenseaUrl({
                  tokenId: l.maker_asset_bundle.assets[0].token_id,
                })}
              >
                {" "}
                here
              </a>
            </div>
          ))
        : null}
    </div>
  );
}
