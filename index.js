require('dotenv').config()
const express = require('express')

const db = require('./lib/db')
const router = require('./routes')

db.connect();
require("./lib/redis");
require("./lib/mail");


const app = express();
app.use(express.json())
app.use(router);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT , () => console.log(`Listening on port ${PORT}`));

module.exports = server;