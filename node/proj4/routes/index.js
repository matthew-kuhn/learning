const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Welcome', template: 'index' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
