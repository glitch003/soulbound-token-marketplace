import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { mintPKP, getEthAddress, getSigner, sendPKP } from "./lit";
import OwnedPKPs from "./OwnedPKPs";
import GetPKP from "./GetPKP";

// for debugging using this stuff in the dev console
window.ethers = ethers;
window.LitJsSdk = LitJsSdk;

export default function App() {
  return (
    <div className="App">
      <div style={{ height: 100 }}></div>

      <OwnedPKPs />

      <div style={{ height: 100 }}></div>

      <GetPKP />

      <div style={{ height: 100 }}></div>
    </div>
  );
}
