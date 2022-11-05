import { useEffect, useState } from "react";
import {
  getOpenseaUrl,
  getOwnedPKPs,
  getSigner,
  getOpenseaUrlForAnyNft,
} from "./lit";
import SendPKP from "./SendPKP";
import SellPKP from "./SellPKP";

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
              <SellPKP tokenId={pkp.tokenId} />
              <button onClick={() => window.open(pkp.openseaUrl)}>
                View on OpenSea
              </button>
              <div>
                <h4>Soulbound tokens and NFTs this wallet owns</h4>
                {pkp.nftsThisWalletOwns.ownedNfts.map((n) => (
                  <a
                    href={getOpenseaUrlForAnyNft({
                      contractAddress: n.contract.address,
                      tokenId: n.id.tokenId, // nneed to convert to int
                    })}
                  >
                    {n.metadata.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
