const User = require('../../models/userSchema')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../utils/sendEmail')
const forgetPassC = async (req,res)=>{

    const {email}= req.body

    if(!email)
    {
        return res.status(400).json({
            success:false,
            message:'Email Not Found'
        })
    }

    const existingUser = await User.findOne({email:email})
    if(!existingUser)
    {
        return res.status(401).json({
            success:false,
            message:'User not found'
        })
    }


    let forgetPassToken = jwt.sign({
        _id:existingUser._id,
        email:existingUser.email,
        role:existingUser.role
    },process.env.JWT_VERIFY_SECRET,{
        expiresIn:'6m'
    })


    await sendEmail({
            to: existingUser.email,
            type: 'RESET_PASSWORD',
            token: forgetPassToken
        })


        return res.status(201).json({
            success:true,
            message:'Password Reset Link send'
        })
}
module.exports = forgetPassC