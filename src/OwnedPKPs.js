import { Grid, LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  getOpenseaUrl,
  getOwnedPKPs,
  getSigner,
  getOpenseaUrlForAnyNft,
} from "./lit";

import OwnedPKP from "./OwnedPKP";

export default function OwnedPKPs({ownedPkps, loading, rerender }) {


  return (
    <div>
      <h3>Your Liquid Wallets</h3>
      {loading ?    
              <div style={{width: "100%",display: "flex", justifyContent: "center"}}>     
        <div style={{width: 300, borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"20px"}} >
          <LinearProgress />
          </div>
        </div>:
      ownedPkps.length ? (
        <div style={{display: "flex", justifyContent: "center", margin: 40, marginBottom: 0}}>
        <Grid justifyContent="center"  container spacing={2}>
          {ownedPkps.map((pkp) => (
              <OwnedPKP rerender={rerender} pkp={pkp} />
          ))}
        </Grid>
        </div>
      ) : 
        <div style={{width: "100%",display: "flex", justifyContent: "center"}}>   
          <div style={{width: 300, borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"20px"}} >
          <div style={{width: "300px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            None
          </div>
        </div>
      </div>
      }
    </div>
  );
}
