const ownerWiseCategoryHelperFunction = require("../../utils/ownerWiseCategoryHelperFunction")

const allOwnerWiseCategoryC = async (req, res) => {
    try {
        const {id} = req.params

        const OwnerWiseCategory = await ownerWiseCategoryHelperFunction(id)

        if(!OwnerWiseCategory || OwnerWiseCategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No category found for this owner'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Owner wise category',
            data: OwnerWiseCategory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = allOwnerWiseCategoryC