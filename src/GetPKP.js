import { useEffect, useState } from "react";

import { mintPKP, getEthAddress, getSigner } from "./lit";
import { Button, Card, CircularProgress } from '@material-ui/core';

export default function GetPKP({rerender}) {
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
    rerender()
    setLoading(false);
  };

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
   <div style={{borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"20px", minWidth: 300, width: "auto"}} >
          <div style={{padding: "20px", paddingTop: "0px"}}>
            <h3>Create a liquid wallet</h3>
            {loading ? <CircularProgress /> : <Button variant="contained" color="primary" onClick={handleGetWallet} disabled={loading}>
              Mint
            </Button>}
          </div>
      </div>
    </div>
  );
}
