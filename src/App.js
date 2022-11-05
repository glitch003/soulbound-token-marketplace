import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import OwnedPKPs from "./OwnedPKPs";
import GetPKP from "./GetPKP";
import PKPsForSale from "./PKPsForSale";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOwnedPKPs, getSigner } from "./lit";
import { Button } from "@material-ui/core";
import {tuncateWalletAddress} from './utils'


// for debugging using this stuff in the dev console
window.ethers = ethers;
window.LitJsSdk = LitJsSdk;

export default function App() {

  const [hackyIndex, setHackyIndex] = useState(0);
  const [ownedPkps, setOwnedPkps] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      const signer = await getSigner();
      const fetchedOwnedPkps = await getOwnedPKPs({ signer });
      setOwnedPkps(fetchedOwnedPkps);
      setLoading(false)
    };
    go();
  }, [hackyIndex]);

  const rerender = useCallback(() => {
    setHackyIndex(hackyIndex + 1)
    setLoading(true)
  })


  return (
    <div className="App">

      <div style={{ height: 50 }}></div>

      <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
        <div style={{width: 200}}></div>
      <h1 className="text-anim" style={{margin: 0}}>SOULESS</h1>
      <div style={{height: 55, width: 200, display: "flex", alignItems: "center"}}>
        <Button onClick={() => getSigner()} variant="contained" color="primary">{window.account ? tuncateWalletAddress(window.account): "Connect Wallet"}</Button>
      </div>
      </div>


      <div style={{ height: 50 }}></div>

      <OwnedPKPs rerender={rerender} ownedPkps={ownedPkps} loading={loading}/>

      <div style={{ height: 50 }}></div>

      <GetPKP rerender={rerender} />

      <div style={{ height: 50 }}></div>

      <PKPsForSale />

      <div style={{ height: 50 }}></div>
      <ToastContainer theme="dark" />
    </div>
  );
}
