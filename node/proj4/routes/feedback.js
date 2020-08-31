const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    return response.send(feedback);
  });
  router.post('/', (req, res) => {
    return res.send('Feedback Form Posted');
  });
  return router;
};
