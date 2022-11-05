import { Box, Button, Card, CardHeader, FormGroup, Input, LinearProgress, MenuItem, Modal, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSigner, sendPKP } from "./lit";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SendPKP(props) {
  const { tokenId } = props;
  const [toAddress, setToAddress] = useState("");
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState("")



  const handleSendWallet = async () => {
    const signer = await getSigner();
    setLoading(true);
    await sendPKP({ signer, toAddress, tokenId });
    setLoading(false);
    setModalOpen(false)
    toast(`*Soulbound* token transfered`)
    props.rerender()
  };


  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div style={{ display: "flex", justifyContent:"center", alignItems:"center", height: "100%"}}>
          <div style={{borderRadius: 20, background:"rgb(210,252,221)", border: "2px solid black", boxShadow: "10px 5px 5px black", padding:"20px"}}>
            <h3 style={{ display: "flex", justifyContent:"center", alignItems:"center"}}>Send liquid wallet</h3>
            <div style={{ height: 10 }}></div>
            {loading ? <LinearProgress /> :
            <FormGroup>
              <TextField id="outlined-basic"  onChange={e => setToAddress(e.target.value)}  label="Address" variant="outlined" /> 
              <div style={{ height: 30 }}></div>
              <Button onClick={handleSendWallet} variant="contained" color="primary">Send</Button>              
              <div style={{ height: 10 }}></div>
              <Button onClick={() => setModalOpen(false)} variant="contained" color="secondary">Cancel</Button>
            </FormGroup>
            }
            </div>
        </div>
      </Modal>
      <MenuItem variant="contained" color="primary"  onClick={() => setModalOpen(true)}>Send</MenuItem>
     </>
  );
}
