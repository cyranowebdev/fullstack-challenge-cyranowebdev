const express = require('express');
const controllers = require('../controllers/users');
const middlewares = require('../middlewares');

const users = express.Router();
users.post('/', middlewares.authToken, controllers.getUser);
users.post('/register', controllers.register);

module.exports = users;
