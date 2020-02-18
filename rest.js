const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const router = require('./router');

const axios = require('axios');

mongoose.connect('mongodb://192.168.99.100:32769/insta', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('req.headers', req.headers.authorization, req.headers)
    return res.json({ message: 'No token' });
    
  } else {
    const [type, token] = req.headers.authorization.split(' ');

    jwt.verify(token, 'secret-user-phrase', (err, payload) => {
      if (err) {
        return res.json({ message: 'Wrong token' });
      }

      req.user = payload;

      next();
    });
  }
});

app.use('/', express.static('public'))

app.use(router);

app.listen(8888);
