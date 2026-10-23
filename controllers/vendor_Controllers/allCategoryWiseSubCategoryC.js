const SubCategory = require('../../models/subCategorySchema')

const allCategoryWiseSubCategoryC = async (req, res) => {
    try {
        const {id} = req.params

        const CatWiseSubCat = await SubCategory.find({
            parentCat: id
        }).populate('parentCat')

        return res.status(200).json({
            success: true,
            message: 'Category wise sub category',
            data: CatWiseSubCat
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = allCategoryWiseSubCategoryC