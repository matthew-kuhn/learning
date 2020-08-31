const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['SDFHAUNSDFJAsd3', 'sajkdhq#RJDr84f'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

const port = 3000;

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    console.log(response.locals);
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
