const https = require('https');

const WIZZ_HOST = 'be.wizzair.com';
const WIZZ_PATH = '/8.5.1/Api/asset/farechart';

module.exports = (req, res, next) => {
  const payload = JSON.stringify({
    wdc: false,
    flightList: [
      {
        departureStation: 'VNO',
        arrivalStation: 'BCN',
        date: '2018-11-03',
      },
      {
        departureStation: 'BCN',
        arrivalStation: 'VNO',
        date: '2018-11-10',
      }
    ],
    dayInterval: 3,
    adultCount: 1,
    childCount: 0,
    isRescueFare: false,
  });

  const options = {
    hostname: WIZZ_HOST,
    port: 443,
    path: WIZZ_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
      'Accept-Language': 'en-US,en;q=0.5',
      Host: 'be.wizzair.com',
      Origin: 'https://wizzair.com',
      Referer: 'https://wizzair.com/lt-lt',
      TE: 'Trailers',
      Accept: 'application/json, text/plain, */*',
      Connection: 'keep-alive',
    },
  };

  res.setHeader("Content-Type", "application/json");
  const wizzReq = https.request(options, wizzRes => wizzRes.pipe(res));

  wizzReq.on('error', error => next(error));
  wizzReq.write(payload);
  wizzReq.end();
};
