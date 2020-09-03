const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const Speakers = await speakerService.getList();
      const artwork = await speakerService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        Speakers,
        artwork,
      });
    } catch (error) {
      return next(error);
    }
  });
  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.shortname);
      const artwork = await speakerService.getArtworkForSpeaker(req.params.shortname);

      return res.render('layout', {
        pageTitle: speaker.name,
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
