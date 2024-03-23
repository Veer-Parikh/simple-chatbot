import { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import GPTResponse from './components/GPTResponse';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
  const [open,setOpen] = useState(false);
  const [prompt,setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setResponse("")
    setLoading(true);
    const res = await axios.post("http://localhost:3000/chat", {prompt})
    setResponse(res);
    setLoading(false);
  }

  return (
    <div className='app'>
      <div className='panel'>
        <img width="48" height="48" src="https://img.icons8.com/color/48/deadpool.png" alt="deadpool"/>
        <h1>ChatGPT Chatbot</h1>
        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/FFFFFF/chatgpt.png" alt="chatgpt"/>
      </div>
      <hr></hr><center>
      <button onClick={handleOpen} className='btn1'>Ask Me Anything!</button>
      </center>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
      >
        <Box className='box'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Drop Your Question
          </Typography>
          <form style={{display:"flex",flexDirection:"column",padding:"10px"}} onSubmit={(e) => handleSubmit(e)}>
            <TextField value={prompt} onChange={(e) => setPrompt(e.target.value)} id="outlined-basic" label="Query" variant="outlined" />
            <button className='btn' type='submit'>Submit</button>
          </form>

          {loading && <LinearProgress />}
          {response && <GPTResponse response={response} />}
        </Box>
      </Modal>
    </div>
  )
}

export default App