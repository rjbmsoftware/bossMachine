const express = require('express');
const ideaRouter = express.Router();
const db = require('../db.js');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

ideaRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = db.getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        return next();
    } else {
        res.status(404).send('Idea not found');
    }
});

ideaRouter.get('/', (req, res, next) => {
    const allIdeas = db.getAllFromDatabase('ideas');
    res.send(allIdeas);
});

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideaRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body, req.idea.id);
    if (updatedIdea) {
        return res.send(updatedIdea);
    }

    return res.status(400).send('Bad idea');
});

ideaRouter.delete('/:ideaId', (req, res) => {
    db.deleteAllFromDatabase('ideas', req.idea.id);
    res.status(204).send();
});

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if (newIdea) {
        return res.status(201).send(newIdea);
    }

    res.status(400).send('Invalid idea');
});

module.exports = ideaRouter;