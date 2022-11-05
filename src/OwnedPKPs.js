import { useEffect, useState } from "react";
import {
  getOpenseaUrl,
  getOwnedPKPs,
  getSigner,
  getOpenseaUrlForAnyNft,
} from "./lit";
import SendPKP from "./SendPKP";
import SellPKP from "./SellPKP";
import { Button, Card, CardContent, CardHeader, CircularProgress, Grid, Menu, MenuItem } from "@material-ui/core";
import { tuncateWalletAddress } from "./utils";
import OwnedPKP from "./OwnedPKP";

export default function OwnedPKPs() {
  const [ownedPkps, setOwnedPkps] = useState(null);
  
  useEffect(() => {
    const go = async () => {
      const signer = await getSigner();
      const fetchedOwnedPkps = await getOwnedPKPs({ signer });
      setOwnedPkps(fetchedOwnedPkps);
    };
    go();
  }, []);



  return (
    <div>
      <h3>Your Liquid Wallets</h3>
      {ownedPkps ? (
        <div style={{display: "flex", justifyContent: "center"}}>
        <Grid justifyContent="center"  container spacing={2}>
          {ownedPkps.map((pkp) => (
            <OwnedPKP pkp={pkp} />
          ))}
        </Grid>
        </div>
      ) : <CircularProgress />}
    </div>
  );
}
