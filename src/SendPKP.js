import { Box, Button, Card, CardHeader, FormGroup, Input, MenuItem, Modal, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
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
  const [modalOpen, setModalOpen] = useState("")



  const handleSendWallet = async () => {
    const signer = await getSigner();

    // setLoading(true);
    const sendingReceipt = await sendPKP({ signer, toAddress, tokenId });
    console.log("sendingReceipt", sendingReceipt);
    // setLoading(false);
  };
  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div variant="outlined" style={{padding: "40px", display: "flex", justifyContent:"center", alignItems:"center", height: "100%"}}>
        <Card>
          <div style={{padding: "20px"}}>
            <CardHeader title="Send Wallet" />
            <FormGroup>
              <TextField id="outlined-basic" label="Address" variant="outlined" /> 
              <Button variant="contained" color="primary">Send</Button>
            </FormGroup>
          </div>
        </Card>
        </div>
      </Modal>
      <MenuItem variant="contained" color="primary"  onClick={() => setModalOpen(true)}>Send</MenuItem>
     </>
  );
}
