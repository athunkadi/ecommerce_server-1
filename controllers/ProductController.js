const { Product, Sequelize } = require('../models');
const Op = Sequelize.Op;

class ProductController{

  static findAll(req, res, next){
    Product.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static create(req, res, next) {
    let obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.create(obj)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        // console.log(err.errors[0], "ini error input");
        res.status(401).json({msg: err.errors[0].message})
        // next({msg: err.errors[0].message, status: 401});
      })
  }

  static findId (req, res, next) {
    const idProduct = +req.params.id;

    Product.findOne({ where: {id: idProduct}})
      .then(data => {
        if(data){
          res.status(200).json(data);
        } else {
          res.status(404).json({"error": "Task Not Found"})
        }
      })
      // .then(err => {
      //   next(err)
      // })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res, next){
    const idProduct = +req.params.id;
    const obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(obj, { where : {'id' : idProduct}, returning: true})
      .then(data => {
        res.status(200).json(data[1]);
      })
      .catch(err => {
        res.status(401).json({msg: err.errors[0].message})
        // next(err)
      })
  }

  static delete(req, res, next) {
    const idProduct = +req.params.id;

    Product.destroy({ where : {'id': idProduct}})
      .then(data => {
        res.status(200).json({name : data.name, msg : 'Delete Success'});
      })
      .catch(err => {
        res.status(500).json({msg: err.errors[0].message})
        // next(err)
      })
  }
}

module.exports = ProductController