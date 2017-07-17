const https = require('https');
const querystring = require('querystring');


module.exports = (req, res, next) => {
  const HOST = 'https://desktopapps.ryanair.com';
  const PATH = '/v3/lt-lt/availability';

  const query = querystring.stringify({
    ADT: 2,
    CHD: 0,
    DateIn: '2017-09-29',
    DateOut: '2017-09-04',
    Destination: 'CIA',
    FlexDaysIn: 6,
    FlexDaysOut: 2,
    INF: 1,
    Origin: 'VNO',
    RoundTrip: true,
    TEEN: 0,
    ToUs: 'AGREED',
    exists: false
  });

  https.get(`${HOST}${PATH}?${query}`, ryanairRes => ryanairRes.pipe(res))
    .on('error', err => next(err));
};
