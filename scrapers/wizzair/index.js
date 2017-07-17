const https = require('https');

const WIZZ_HOST = 'be.wizzair.com';
const WIZZ_PATH = '/6.0.2/Api/search/search';

module.exports = (req, res, next) => {
  const payload = JSON.stringify({
    isFlightChange: false,
    isSeniorOrStudent: false,
    flightList: [{
      departureStation: 'KUN',
      arrivalStation: 'FCO',
      departureDate: '2017-07-31'
    }, {
      departureStation: 'FCO',
      arrivalStation: 'KUN',
      departureDate: '2017-08-11'
    }],
    adultCount: 2,
    childCount: 0,
    infantCount: 1,
    wdc: true,
    rescueFareCode: ''
  });

  const options = {
    hostname: WIZZ_HOST,
    port: 443,
    path: WIZZ_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    },
  };

  const wizzReq = https.request(options, wizzRes => wizzRes.pipe(res));

  wizzReq.on('error', error => next(error));
  wizzReq.write(payload);
  wizzReq.end();
};
