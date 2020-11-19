const router = require('express').Router();
const routerUser = require('./user');
const routerProduct = require('./product');
const routerCart = require('./cart');

router.use(routerUser);
router.use('/product', routerProduct);
router.use('/cart', routerCart);

module.exports = router;