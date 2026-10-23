const SubCategory = require('../../models/subCategorySchema')

const createSubCategoryC = async (req, res) => {
    try {
        const {name, parentCat} = req.body

        if(!name) {
            return res.status(400).json({
                success: false,
                message: 'Give subCategory Name'
            })
        }

        const existingsubcat = await SubCategory.findOne({name: name})

        if(existingsubcat) {
            return res.status(400).json({
                success: false,
                message: 'Sub Category Already Exists'
            })
        }

        const newSubCat = new SubCategory({
            name: name,
            parentCat: parentCat
        })

        await newSubCat.save()

        await sendEmail({
        to:process.env.ADMIN_EMAIL,
        type:'NEW_SUBCATEGORY',
        subCategoryName: newSubCat.name
    })

        return res.status(201).json({
            success: true,
            message: 'Sub category created',
            data: newSubCat
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = createSubCategoryC