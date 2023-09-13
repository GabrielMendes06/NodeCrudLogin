const express = require('express');
const router = express.Router();

const LoginController = require('./controllers/LoginController')


router.get('/users/statementdata/:id', LoginController.getAllStatement);
router.get('/users/getuser/:id', LoginController.getUser);
router.get('/users/getallusers', LoginController.getAllUsers)

router.post('/new-user', LoginController.handlePost);
router.post('/users', LoginController.loginValidation);
router.post('/users/transferbalance', LoginController.transferBalance)

router.put('/users/:id', LoginController.handleUpdate);
router.put('/users/newbalance/:id', LoginController.addBalance);

router.delete('/users/:id', LoginController.handleDelete);


module.exports = router; 