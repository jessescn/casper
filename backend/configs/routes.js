const express = require('express');

const AdminController = require('../controllers/UserController');
const NewsController = require('../controllers/NewsController');
const WebhookController = require('../controllers/WebhookController');

const routes = express.Router();

routes.post('/register', AdminController.signOn);
routes.post('/login', AdminController.signIn);
routes.get('/users', AdminController.index);

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.post);
routes.post('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);

routes.post('/webhook', WebhookController.receive);
routes.get('/webhook', WebhookController.handleWebhook);

module.exports = routes;