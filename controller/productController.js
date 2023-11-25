const Products = require('../model/productModel')

const createProduct = async(req,res) => {
    // res.send('hello')
    console.log(req.body);
    if(!req.body.name || !req.body.price || !req.body.images || !req.body.productType || !req.body.quantity ){
        return res.status(404).json({
            status: 'failed',
            message: 'missing a property please enter all the fields'
        })
    }
    newProd = await Products.create(req.body)

    res.status(201).json({
        status: 'success',
        message: 'Product added'
    })
}

const getAllProducts = async(req, res) => {
    const productType = req.query.type  
    const query = productType ? {productType} : {}
    console.log(query);


    allProducts = await Products.find(query)
    // console.log(allProducts);
    res.status(200).json({
        status: "success",
        products : allProducts,
        message: 'fetched all products'
    })
}


module.exports = {
    createProduct,
    getAllProducts
}