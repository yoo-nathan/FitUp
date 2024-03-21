const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

//Save this to sql later
const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});


//Registering User
app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { email: req.body.email, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});


//Login
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        //Use the same message for user not found for bette security
        return res.status(400).send('Login Failed'); 
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Login Failed');
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000);
