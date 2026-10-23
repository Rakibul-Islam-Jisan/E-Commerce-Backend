const mongoose = require('mongoose')

const {Schema} = mongoose

const subCategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:['active','reject','deactive'],
        default:'deactive'
    },
    parentCat:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
})
module.exports = mongoose.model('SubCategory',subCategorySchema)