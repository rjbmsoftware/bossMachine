const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./routes/minions-routes');
const ideaRouter = require('./routes/ideas-routes');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);

module.exports = apiRouter;
