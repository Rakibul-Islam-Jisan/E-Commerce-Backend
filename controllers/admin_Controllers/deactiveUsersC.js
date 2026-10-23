const User = require('../../models/userSchema')
const deactiveUsersC = async (req,res)=>{
 let UserData = await User.find({status : 'deactive'})
    res.status(200).json({
        success : true,
        message : 'Deactive user information',
        data : UserData
    })
}
module.exports = deactiveUsersC