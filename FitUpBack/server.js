const express = require('express');
const authRouter = require('./routes/authRoute');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use('/authenticate', authRouter);

app.listen(3000, () => console.log('Server running on port 3000'));

