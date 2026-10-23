const Product = require('../../models/productSchema')

const categoryWiseProductC = async (req, res) => {
    try {
        const {id} = req.params

        const catWiseProduct = await Product.find({category: id}).populate(['category', 'subCategory', 'owner'])

        if(!catWiseProduct || catWiseProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No category wise product found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Category wise product',
            data: catWiseProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = categoryWiseProductC