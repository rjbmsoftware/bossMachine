const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./routes/minions-routes');
const ideaRouter = require('./routes/ideas-routes');
const meetingRouter = require('./routes/meetings-routes');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;
