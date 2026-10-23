
const User = require('../../models/userSchema')
const deleteUserC = async (req, res) => {
   
        const { id } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        return res.status(201).json({
            success: true,
            message: "user deleted successfully"
        });

    }

    module.exports = deleteUserC