const Cart = require('../model/cartModel')

const addTocart = async (req,res) => {
    await Cart.create(req.body)
    res.status(200).json({
        status:'success',
        message: 'added to cart'
    })
}

const getCartItems = async(req, res) => {
    const currentUser = req.params.currentUser;
    const cartItems = await Cart.find({ currentUser })
    // console.log(cartItems);
    res.status(200).json({
        status: 'success',
        cartItems,
        message: 'retrieved cart Items'
    })
}



const removeCartItem = async (req, res) => {
    try {
        const userId = req.params.userId;
        const id = req.params.productId;
        // console.log(userId, id);


        await Cart.deleteOne({ _id: id, currentUser: userId });

        res.status(200).json({
            status: 'success',
            message: 'deleted'
        });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};



module.exports = {
    addTocart,
    getCartItems,
    removeCartItem
}