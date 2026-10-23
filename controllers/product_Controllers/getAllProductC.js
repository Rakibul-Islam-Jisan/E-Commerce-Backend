const Product = require('../../models/productSchema')

const getAllProductC = async (req, res) => {
    try {
        const allProducts = await Product.find({}).populate(['category', 'subCategory', 'owner'])

        return res.status(200).json({
            success: true,
            message: 'All products',
            count: allProducts.length,
            data: allProducts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = getAllProductC