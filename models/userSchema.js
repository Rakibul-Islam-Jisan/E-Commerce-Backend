const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        
    },
    terms:{
        type:Boolean,
        default:false,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    remember:{
        type:Boolean,
        default:false
    },
    isLogin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },

})

module.exports = mongoose.model('User',userSchema)