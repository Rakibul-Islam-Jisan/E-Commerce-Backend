const Product = require('../../models/productSchema')

const subCategoryWiseProductC = async (req, res) => {
    try {
        const {id} = req.params

        const subCatWiseProduct = await Product.find({subCategory: id}).populate(['category', 'subCategory', 'owner'])

        if(!subCatWiseProduct || subCatWiseProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No sub category wise product found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Sub category wise product',
            data: subCatWiseProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = subCategoryWiseProductC