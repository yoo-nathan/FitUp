const express = require('express');
require('dotenv').config();
const authRouter = require('./routes/authRoute');

const app = express();
app.use(express.json());
app.use('/users/authenticate', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
