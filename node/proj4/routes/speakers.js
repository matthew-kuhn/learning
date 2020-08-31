const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    return response.send(speakers);
  });
  router.get('/:shortname', (req, res) => {
    return res.send(`Detail page of ${req.params.shortname}`);
  });
  return router;
};
