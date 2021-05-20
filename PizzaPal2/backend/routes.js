const express = require('express');
const checkAuth = require('./middleware/check-auth');

const menuController = require('./controllers/menu-controller');
const orderController = require('./controllers/order-controller');
const userController = require('./controllers/user-controller');

const router = express.Router();

router.get('/', menuController.getMenu);
router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.use(checkAuth);

router.post('/checkout', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:uid', orderController.getOrdersByUserId);

router.get('/users/:uid', userController.getUserById);
router.put('/updateuser/:uid', userController.updateUser);
router.delete('/deleteuser/:uid', userController.deleteUser);

module.exports = router;
