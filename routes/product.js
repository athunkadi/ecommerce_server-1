const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.get('/', ProductController.findAll);
router.use(authentication);
router.post('/', authorization, ProductController.create);
router.get('/:id', authorization, ProductController.findId);
router.put('/:id', authorization, ProductController.update);
router.delete('/:id', authorization, ProductController.delete);


module.exports = router;