const express = require('express');
const ideaRouter = express.Router();
const db = require('../db.js');

/*

    GET /api/ideas to get an array of all ideas.
    POST /api/ideas to create a new idea and save it to the database.
    GET /api/ideas/:ideaId to get a single idea by id.
    PUT /api/ideas/:ideaId to update a single idea by id.
    DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

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

ideaRouter.put('/:ideaId', (req, res, next) => {
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

ideaRouter.post('/', (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if (newIdea) {
        return res.status(201).send(newIdea);
    }

    res.status(400).send('Invalid idea');
});

module.exports = ideaRouter;