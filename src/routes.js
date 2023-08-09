const express = require('express');
const router = express.Router();

const LoginController = require('./controllers/LoginController')
router.get('/users', LoginController.getAll);
router.delete('/users/:id', LoginController.handleDelete);
router.post('/new-user', LoginController.handlePost);
router.put('/users/:id', LoginController.handleUpdate);

module.exports = router;