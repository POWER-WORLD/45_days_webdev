// access environment variables
require('dotenv').config();

module.exports = {
  mongo_port: process.env.PORT || 5000,
  db_name: process.env.DB_NAME,
  mongo_url: process.env.MONGODB_URI

};