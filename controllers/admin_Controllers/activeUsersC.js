const User = require('../../models/userSchema')
const activeUsersC = async (req,res)=>{
 let UserData = await User.find({status : 'active'})
    res.status(200).json({
        success : true,
        message : 'Active user information',
        data : UserData
    })
}
module.exports = activeUsersC