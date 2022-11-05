import { useEffect, useState } from "react";
import { getOwnedPKPs, getSigner } from "./lit";
import SendPKP from "./SendPKP";

export default function OwnedPKPs() {
  const [ownedPkps, setOwnedPkps] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const go = async () => {
      console.log("getting owned PKPs");
      setLoading(true);
      const signer = await getSigner();
      const ownedPkps = await getOwnedPKPs({ signer });
      setOwnedPkps(ownedPkps);
      setLoading(false);
    };
    go();
  }, []);
  return (
    <div>
      <h3>Wallets you own</h3>
      {loading ? <h3>Loading wallets you already own...</h3> : null}
      {ownedPkps ? (
        <div>
          {ownedPkps.map((pkp) => (
            <div key={pkp.tokenId}>
              <p>
                Wallet:{" "}
                <a
                  href={`https://mumbai.polygonscan.com/address/${pkp.ethAddress}`}
                  target="_blank"
                >
                  {pkp.ethAddress}
                </a>
              </p>
              <SendPKP tokenId={pkp.tokenId} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
