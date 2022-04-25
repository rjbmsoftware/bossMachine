const express = require('express');
const minionRouter = express.Router();
const db = require('../db.js');

minionRouter.param('minionId', (req, res, next) => {
    const minion = db.getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        req.minion = minion;
        return next();
    }

    res.status(404).send('Minion not found');
})

minionRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
});

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion =  db.updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        return res.send(updatedMinion);
    }

    return res.status(400).send('invalid minion');
});

minionRouter.delete('/:minionId', (req, res, next) => {
    db.deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});

minionRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if (newMinion) {
        return res.status(201).send(newMinion);
    }

    return res.status(400).send('Invalid minion');
});

module.exports = minionRouter;
