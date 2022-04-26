const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const meetingRouter = express.Router();
const db = require('../db');

meetingRouter.get('/', (req, res) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
});

meetingRouter.post('/', (req, res) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingRouter.delete('/', (req, res) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});
 
module.exports = meetingRouter;