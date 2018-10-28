const restify = require('restify');
const wizzairScraper = require('./scrapers/wizzair');
const ryanairScraper = require('./scrapers/ryanair');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '8080';

const server = restify.createServer({
  name: 'Flights scraper'
});

server.use(function logger(req,res,next) {
  console.log(new Date(),req.method,req.url);
  next();
});

server.on('uncaughtException', (request, response, route, error) => {
  console.error(error.stack);
  response.send(error);
});

server.get('/flights', wizzairScraper);

server.listen(port, host, () => {
  console.log('%s listening at %s', server.name, server.url);
});
