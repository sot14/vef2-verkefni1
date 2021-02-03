import express from 'express';
import { utils } from './src/utils.js';
// import { utils } from 'stylelint';
import { router as videoRouter } from './src/videos.js';

const app = express();

const host = 'localhost';
const port = 3000;

app.use(express.static('public'));
app.use('/', videoRouter);

app.set('views', './views');
app.set('view engine', 'ejs');

app.locals.importantize = str => `${str}!`;
app.locals.time_formatter = function(tstamp) {
  return utils.dateFormatter(tstamp);
}
app.locals.duration_formatter = function(tstamp) {
  return utils.durationFormatter(tstamp);
}

/**
 * Middleware sem sér um 404 villur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki!';
  res.status(404).render('error', { title, message });
}

/**
 * Middleware sem sér um villumeðhöndlun.
 *
 * @param {object} err Villa sem kom upp
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, host, () => {
  console.log(
    `Server @ http://${host}:${port}/`,
  );
});