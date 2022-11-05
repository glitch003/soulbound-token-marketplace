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
import { Button, Modal } from "@material-ui/core";
import {tuncateWalletAddress} from './utils'


// for debugging using this stuff in the dev console
window.ethers = ethers;
window.LitJsSdk = LitJsSdk;

export default function App() {

  const [modalOpen, setModalOpen] = useState(false)
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
     <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
     <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{minWidth: 300, maxWidth: 350, borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"20px", textAlign: "center"}}>
      <b>What is Soulless?</b>
      <br></br>    <br></br>
      Soulless is an interface for creating and selling liquid wallets. A liquid wallet is a transferred key and is made secure by using Lit Protocol, an MPC programmable wallet network. 
      <br></br>   <br></br>
      <b>Why is it called Soulless?</b>
      <br></br>   <br></br>
      Soulbound tokens are introduced as <b><i>non transferable</i></b> and this application shows that private keys can be securely tradable and as a result these tokens are no longer soul bound, therefore Soulless
      <div style={{ height: 20 }}></div>
      <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">Ok</Button>
      </div>
      </div>
      </Modal>
      <div style={{ height: 50 }}></div>

      <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
      <div style={{height: 55, width: 200, display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Button onClick={() => setModalOpen(true)} variant="contained" color="primary">About</Button>
      </div>
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
