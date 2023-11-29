const Products = require('../model/productModel');

const createProduct = async (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price || !req.body.images || !req.body.productType || !req.body.quantity) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing a property. Please enter all the required fields.'
    });
  }

  try {
    const newProd = await Products.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Product added',
      product: newProd
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

const getAllProducts = async (req, res) => {
  const { type, gender } = req.query;
  const query = {};

  if (type) {
    query.productType = type;
  }

  if (gender) {
    query.gender = gender;
  }

  try {
    const allProducts = await Products.find(query);
    res.status(200).json({
      status: 'success',
      products: allProducts,
      message: 'Fetched all products'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts
};
