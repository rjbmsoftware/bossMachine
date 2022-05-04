const checkMillionDollarIdea = (req, res, next) => {

    if (!Object.hasOwn(req.body, 'numWeeks') || !Object.hasOwn(req.body, 'weeklyRevenue')) {
        return res.status(400).send('Body must contain numWeeks and weeklyRevenue');
    }
    const body = req.body;
    const numWeeks = Number.parseInt(body.numWeeks);
    const invalidNumWeeks = Number.isNaN(numWeeks);
    const weeklyRevenue = Number.parseInt(body.weeklyRevenue);
    const invalidWeeklyRevenue = Number.isNaN(weeklyRevenue);
    if (invalidNumWeeks || invalidWeeklyRevenue) {
        return res.status(400).send();
    }

    const ideaValue = body.numWeeks * body.weeklyRevenue;
    if (ideaValue < 1000000) {
        return res.status(400).send();
    }

    next();
};

module.exports = checkMillionDollarIdea;
