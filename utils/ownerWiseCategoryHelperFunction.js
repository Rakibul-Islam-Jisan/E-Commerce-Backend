const Category = require('../models/categorySchema')
const SubCategory = require('../models/subCategorySchema')

const ownerWiseCategoryHelperFunction = async (id)=>{

    const categories = await Category.find({owner:id}).populate('owner')

    const categorywisesubcategory = await Promise.all(
        categories.map(async(category)=>{
            const subcategories = await SubCategory.find({
                parentCat:category._id
            })

            return {...category,subCategory:subcategories}
        })
    )

    return categorywisesubcategory
}


module.exports = ownerWiseCategoryHelperFunction