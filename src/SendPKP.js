import { useEffect, useState } from "react";
import { getSigner, sendPKP } from "./lit";

export default function SendPKP(props) {
  const { tokenId } = props;
  const [toAddress, setToAddress] = useState("");

  const handleSendWallet = async () => {
    const signer = await getSigner();

    // setLoading(true);
    const sendingReceipt = await sendPKP({ signer, toAddress, tokenId });
    console.log("sendingReceipt", sendingReceipt);
    // setLoading(false);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Send to..."
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />

      <button onClick={handleSendWallet}>Send wallet to address</button>
    </div>
  );
}
