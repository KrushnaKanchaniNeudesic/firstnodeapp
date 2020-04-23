

const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', function (req, res) {

    const us = new User(req.body);
    us.save().then(() => {

        res.status(201).send(us);
    }).catch((x) => {

    })

})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});