const express = require('express');
const app = express();
const path = require('path');
const messageRoute = require('./routes/message')
const userRoute = require('./routes/user')
const reponseRoute = require('./routes/reponse')
const likeRoute = require('./routes/like')
const helmet = require("helmet");
const cors = require('cors');



app.use(cors())

app.use(express.json());

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/message', messageRoute);
app.use('/like', likeRoute);
app.use('/', userRoute);
app.use('/reponse', reponseRoute);


module.exports = app;