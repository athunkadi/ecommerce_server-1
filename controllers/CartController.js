const { Cart, Product } = require('../models');

class CartController {

  static addCart (req, res) {
    const UserId = req.loginUser.id;
    const ProductId = req.body.ProductId;

    Cart.findOne({ where: {
      UserId: UserId,
      ProductId: ProductId
    }})
    .then(result => {
      if (result) {
        const obj = {
          quantity: result.quantity += 1
        }
        return Cart.update(obj, { where: {'id': result.id}, returning: true})
      } else {
        const obj = {
          UserId: UserId,
          ProductId: ProductId,
          quantity: 1,
          status: false
        }
        return Cart.create(obj)
      }
    })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findAll (req, res) {
    const UserId = req.loginUser.id;

    Cart.findAll({ 
      include: { model: Product, required: true },
      where : { UserId: UserId},
      order: ['id']
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static update (req, res) {
    const idCart = req.body.id;
    const obj = {
      quantity: req.body.quantity
    }
    
    Cart.update(obj, { where: {'id': idCart}, returning: true})
      .then(data => {
        if (data[0] === 0) {
          throw { msg : 'data tidak ada' }
        } else {
          res.status(201).json(data)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteCart (req, res) {
    const CartId = +req.params.id;

    Cart.destroy({ where: {'id': CartId}})
      .then(data => {
        res.status(200).json({msg : 'sukses delete'})
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
}

module.exports = CartController