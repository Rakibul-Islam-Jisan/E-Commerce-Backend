const mongoose = require('mongoose')

const {Schema} = mongoose

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    ShortDescription:{
        type:String,
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    images:[
        {
            url:{
                type:String
            },
            isMain:{
                type:Boolean,
                default:false
            }
        }
    ],
    discountPrice:{
        type:Number
    },
    stock:{
        type:Number
    },
    status:{
        type:String,
        enum:['approved','pending','rejected'],
        default:'pending'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:'SubCategory'
    }
})

module.exports = mongoose.model('Product',productSchema)