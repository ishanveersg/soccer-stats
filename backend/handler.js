const serverless = require('serverless-http');
const app = require('./server.js'); // Your existing Express app

module.exports.handler = serverless(app);
