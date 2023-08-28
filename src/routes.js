const express = require('express');
const router = express.Router();

const LoginController = require('./controllers/LoginController')

router.post('/users', LoginController.loginValidation)
//router.get('/users', LoginController.getAll);
router.delete('/users/:id', LoginController.handleDelete);
router.post('/new-user', LoginController.handlePost);
router.put('/users/:id', LoginController.handleUpdate);
router.put('/users/newbalance/:id', LoginController.addBalance);
router.get('/users/getuser/:id', LoginController.getUser);

module.exports = router; 