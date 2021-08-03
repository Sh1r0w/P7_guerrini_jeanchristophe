const express = require('express');
const app = express();
const path = require('path');
const messageRoute = require('./routes/message')
const userRoute = require('./routes/user')

const cors = require('cors');



app.use(cors())

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/message', messageRoute);
app.use('/', userRoute);
app.use('/user', userRoute);
app.use('/deleteUser', userRoute);


module.exports = app;