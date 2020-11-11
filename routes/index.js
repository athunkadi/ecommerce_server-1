const router = require('express').Router();
const routerUser = require('./user');
const routerProduct = require('./product');

router.use(routerUser);
router.use('/product', routerProduct);

module.exports = router;