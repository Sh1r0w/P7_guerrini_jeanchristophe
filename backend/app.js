const express = require('express');
const app = express();

const messageRoute = require('./routes/message')
const userRoute = require('./routes/user')

const cors = require('cors');



app.use(cors())

app.use(express.json());

  app.use('/message', messageRoute);

  app.use('/', userRoute);


module.exports = app;