const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  uri: process.env.MONGO_URI,
  mapbox_accessToken: process.env.MAPBOX_ACCESS_TOKEN,
};