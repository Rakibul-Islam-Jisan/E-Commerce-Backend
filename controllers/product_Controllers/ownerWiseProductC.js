const Product = require('../../models/productSchema')

const ownerWiseProductC = async (req, res) => {
    try {
        const {id} = req.params

        const ownerWiseProduct = await Product.find({owner: id}).populate(['category', 'subCategory', 'owner'])

        if(!ownerWiseProduct || ownerWiseProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No owner wise product found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Owner wise product',
            data: ownerWiseProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = ownerWiseProductC