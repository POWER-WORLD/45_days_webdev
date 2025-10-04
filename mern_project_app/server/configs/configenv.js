// configenv.js, This file loads environment variables from a .env file
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 4000,
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME
};