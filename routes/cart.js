const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.use(authentication);
router.post('/', CartController.addCart);
router.get('/', CartController.findAll);
router.delete('/:id', CartController.deleteCart);
router.patch('/', CartController.update);

module.exports = router;