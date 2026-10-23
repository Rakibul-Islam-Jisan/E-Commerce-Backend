const jwt = require('jsonwebtoken')
const User = require('../../models/userSchema')
const verifyC = async (req,res)=>{


    const {token} = req.params
    if(!token)
    {
        return res.status(400).json({
            success:false,
            message:'No Token Found'
        })
    }

    let decode = jwt.verify(token,process.env.JWT_VERIFY_SECRET)

    const existing = await User.findById(decode._id);
        if (!existing) {
            return res.status(400).json({
                success: false,
                message: "User Not found. Register First"
            });
        }

    await User.findByIdAndUpdate(decode._id,{isVerified:true})

    return res.status(201).json({
        success:true,
        message:'Account Verified'
    })

}

module.exports = verifyC