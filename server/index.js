const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000 
app.listen(port, () =>{
    console.log("server running on port 3000")
})
