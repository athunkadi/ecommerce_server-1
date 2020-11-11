const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', authorization, ProductController.create);
router.put('/:id', authorization, ProductController.update);
router.delete('/:id', authorization, ProductController.delete);


module.exports = router;