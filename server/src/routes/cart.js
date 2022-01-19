var express = require('express');
var router = express.Router();

const CartController = require('../app/controllers/CartController');

router.post('/create',CartController.addToCart)
router.post('/find',CartController.findItem)
router.post('/update/',CartController.updateItem)
router.delete('/delete/:id',CartController.deleteItem)
router.delete('/destroy/:username',CartController.deleteAll)
router.get('/list/:username',CartController.listItem)

module.exports = router;
