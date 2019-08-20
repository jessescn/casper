const express = require('express');

const AdminController = require('../app/controllers/UserController');
const NewsController = require('../app/controllers/NewsController');
const WebhookController = require('../app/controllers/WebhookController');

const authMiddleware = require('../app/middlewares/auth');

const routes = express.Router();

routes.post('/register', AdminController.signOn);
routes.post('/login', AdminController.signIn);

routes.post('/webhook', WebhookController.receive);
routes.get('/webhook', WebhookController.handleWebhook);

routes.use(authMiddleware);

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.post);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);

module.exports = routes;