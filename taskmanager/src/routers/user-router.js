const express = require('express');
const User = require('../models/user');

const router = new express.Router();
const auth = require('../middleware/auth');


router.post('/users', function (req, res) {
    const us = new User(req.body);
    us.save().then(() => {
        res.status(201).send(us);
    }).catch((x) => {
        res.status(400).send();
    })

});

router.get('/users', auth, (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch(() => {
        res.status(400).send();
    })
});
router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    if (!_id) {
        return res.status(400).send('Id required')
    }

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send(`User not found with id ${_id}`);
        }
        res.status(200).send(user);

    }).catch(() => {
        res.status(500).send();
    });

});


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const toke = await User.generateAuthToken(user);
        res.send({ user: user, token: toke });
    } catch (error) {
        res.status(400).send(error);
    }
})

const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {

        }

        cb(undefined, true);
    }
})

router.post('/users/me/avatar', auth, upload.single('upload'), async (req, res) => {

    req.user.avatar = req.file.buffer;
    await  req.user.save();
    res.status(201).send();

});

router.get('/users/:id/avatar', async (req, res) => {

  const user = await User.findById(req.params.id);

  res.set('Content-Type', 'image/jpg');
  res.send(user.avatar);

});

module.exports = router;

