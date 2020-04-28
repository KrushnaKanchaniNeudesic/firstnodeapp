
const express = require('express');
const router = new express.Router();

const Task = require('../models/task');

router.post('/tasks', function (req, res) {

    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch(() => {
        res.status(400).send();
    })

});

router.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks);
    }).catch(() => {
        res.status(400).send();
    })
});

router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
       if(!_id){
           return res.status(400).send('Id required')
       } 

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send(`User not found with id ${_id}`);
        }
        res.status(200).send(task);

    }).catch(() => {
        res.status(500).send();
    });

});


module.exports = router;