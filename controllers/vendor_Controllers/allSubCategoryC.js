const SubCategory = require('../../models/subCategorySchema')

const allSubcategory = async (req, res) => {
    try {
        const allSubCat = await SubCategory.find({}).populate('parentCat')

       
        if(!allSubCat || allSubCat.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cant find sub category'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'All sub category',
            data: allSubCat
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = allSubcategory