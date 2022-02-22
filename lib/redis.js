"use strict";
const {promisify} = require("util");
const { createClient }  = require('redis');
let redisClient
(async () => {
   redisClient = createClient(6379);

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  await redisClient.connect();
})();



module.exports = {
    redisClient
}
