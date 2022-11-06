import React from "react";
import { useEffect, useState } from "react";
import {
  getOpenseaUrl,
  getOwnedPKPs,
  getSigner,
  getOpenseaUrlForAnyNft,
} from "./lit";
import SendPKP from "./SendPKP";
import SellPKP from "./SellPKP";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { copyTextToClipboard, tuncateWalletAddress } from "./utils";
import { toast } from "react-toastify";

export default function OwnedPKP({ pkp, rerender }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      item
      xs={4}
      sm={4}
      md={4}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: 300,
          maxWidth: 350,
          borderRadius: 20,
          background: "rgb(210,252,221)",
          border: "2px solid black",
          boxShadow: "10px 5px 5px black",
          padding: "20px",
        }}
        key={pkp.tokenId}
      >
        <CardHeader
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Tooltip title="Click to copy">
                <div
                  onClick={() => {
                    copyTextToClipboard(pkp.ethAddress);
                    toast("Copied address to clipboard");
                  }}
                  style={{
                    backgroundColor: "rgb(220, 49, 88)",
                    borderRadius: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                >
                  {tuncateWalletAddress(pkp.ethAddress)}
                </div>
              </Tooltip>
              <Button
                variant="contained"
                color="primary"
                id="basic-button"
                aria-controls={menuOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
              >
                Menu
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <SendPKP rerender={rerender} tokenId={pkp.tokenId}>
                  Send
                </SendPKP>
                <SellPKP tokenId={pkp.tokenId} />
                <MenuItem onClick={() => window.open(pkp.openseaUrl)}>
                  View
                </MenuItem>
              </Menu>
            </div>
          }
        ></CardHeader>
        <div>
          <h4>NFTs/SBTs owned by wallet</h4>
          {pkp.nftsThisWalletOwns.ownedNfts.length
            ? pkp.nftsThisWalletOwns.ownedNfts.map((n) => (
                <div>
                  <a
                    style={{ wordWrap: "break-word" }}
                    href={getOpenseaUrlForAnyNft({
                      contractAddress: n.contract.address,
                      tokenId: n.id.tokenId,
                    })}
                    target="_blank"
                  >
                    {n.metadata.name}
                  </a>
                </div>
              ))
            : "None"}
        </div>
      </div>
    </Grid>
  );
}
