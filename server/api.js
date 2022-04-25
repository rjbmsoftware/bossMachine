const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./routes/minions-routes');

apiRouter.use('/minions', minionRouter);

module.exports = apiRouter;
