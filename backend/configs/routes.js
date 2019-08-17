const express = require('express');
const AdminController = require('../controllers/UserController');
const NewsController = require('../controllers/NewsController');

const routes = express.Router();

routes.post('/register', AdminController.signOn);
routes.post('/login', AdminController.signIn);
routes.get('/users', AdminController.index);

routes.get('/news', NewsController.index);
routes.get('/news/:topic', NewsController.getNewByTopic);
routes.post('/news', NewsController.post);
routes.post('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);

module.exports = routes;