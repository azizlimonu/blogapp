const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    // in other words if the domain is NOT the whitelist than let it pass
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      // the origin will be sendback
    } else {
      callback(new Error('not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;