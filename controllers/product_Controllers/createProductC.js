const Product = require('../../models/productSchema')
const sendEmail = require('../../utils/sendEmail')

const createProductC = async (req, res) => {
    try {
        const {title, description, ShortDescription, price, discountPrice, catID, subCatID, ownerId} = req.body

        
        if(!title || !description || !ShortDescription || !price || !discountPrice || !catID || !subCatID || !ownerId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields",
            })
        }

        const slug = title.toLowerCase().split(' ').join('-')
        const existingslug = await Product.findOne({slug: slug})
        
        if(existingslug) {
            return res.status(400).json({
                success: false,
                message: 'Slug exists'
            })
        }

        const sku = `eco-${Date.now()}`

        const images = []
        if(req.files && req.files.length > 0) {
            req.files.map((item, index) => {
                images.push({
                    url: item.path,
                    isMain: index === 0 ? true : false 
                })
            })
        }

        const newProduct = new Product({
            title: title,
            description: description,
            ShortDescription: ShortDescription,
            price: price,
            discountPrice: discountPrice,
            category: catID,
            subCategory: subCatID,
            owner: ownerId,
            slug: slug,
            sku: sku,
            images: images
        })

        await newProduct.save()

        await sendEmail({
        to:process.env.ADMIN_EMAIL,
        type:'NEW_PRODUCT',
        productTitle: newProduct.name
    })

        return res.status(201).json({
            success: true,
            message: 'New product created',
            data: newProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

module.exports = createProductC