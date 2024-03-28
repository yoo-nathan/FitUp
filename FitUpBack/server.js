const express = require('express');
const authRouter = require('./routes/authRoute');
require('dotenv').config();

const app = express();

// const PORT = process.env.LOCAL_PORT;

app.use(express.json());
app.use('/authenticate', authRouter);

app.listen(3000, () => console.log('Server running on port 3000'));

