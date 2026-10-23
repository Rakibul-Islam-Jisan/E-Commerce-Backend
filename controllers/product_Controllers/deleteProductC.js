const Product = require('../../../models/productSchema');
const sendEmail = require('../../../utils/sendEmail'); 

const deleteProductC = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'No Product with this id found'
            });
        }

        const productTitle = existingProduct.title;

 
        await Product.findByIdAndDelete(id);

       
        await sendEmail({
            to: process.env.ADMIN_EMAIL,
            type: 'DELETE_PRODUCT',
            productTitle: productTitle 
        });

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        });
    }
};

module.exports = deleteProductC;