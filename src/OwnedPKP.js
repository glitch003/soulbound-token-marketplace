import React from "react"
import { useEffect, useState } from "react";
import {
  getOpenseaUrl,
  getOwnedPKPs,
  getSigner,
  getOpenseaUrlForAnyNft,
} from "./lit";
import SendPKP from "./SendPKP";
import SellPKP from "./SellPKP";
import { Button, Card, CardContent, CardHeader, Grid, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { tuncateWalletAddress } from "./utils";

export default function OwnedPKP({pkp}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return  <Grid item xs={4}>
    <Card sx={{  minWidth: 300 }}  key={pkp.tokenId}>
      <CardHeader title={
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Tooltip title={pkp.ethAddress}><div>{tuncateWalletAddress(pkp.ethAddress)}</div></Tooltip>
        <Button 
        variant="contained" 
        color="primary"
        id="basic-button"
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleClick}>
            Menu
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
          >
            <SendPKP>Send</SendPKP>
            <SellPKP tokenId={pkp.tokenId} />
            <MenuItem onClick={() => window.open(pkp.openseaUrl)}>View</MenuItem>
          </Menu>
        </div>}>
        </CardHeader> 
        <CardContent>
      <div>
        <h4>NFTs owned by wallet</h4>
        {pkp.nftsThisWalletOwns.ownedNfts.length ? pkp.nftsThisWalletOwns.ownedNfts.map((n) => (
          <a
            href={getOpenseaUrlForAnyNft({
              contractAddress: n.contract.address,
              tokenId: n.id.tokenId,
            })}
            target="_blank"
          >
            {n.metadata.name}
          </a>
        )) : "None"}
      </div>
      </CardContent>
    </Card>
  </Grid>
}