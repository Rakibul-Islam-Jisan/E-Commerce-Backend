const bcrypt = require('bcryptjs');
const User = require('../../models/userSchema')
const resetPassC = async (req,res)=>{
    const {token} = req.params
    const {newPass,confirmPass}= req.body

    if(!newPass || !confirmPass)
    {
        return res.status(401).json({
            success:false,
            message:'fill all the field'
        })
    }

     const decodedToken = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

     const newHashPassword = await bcrypt.hashSync(newPass,10)

     await User.findByIdAndUpdate({_id:decodedToken._id}, { password: newHashPassword });


     return res.status(201).json({
        success:true,
        message:'password reset successfull'
     })
}

module.exports = resetPassC