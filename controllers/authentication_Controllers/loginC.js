const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const bcrypt = require('bcryptjs')
const User = require('../../models/userSchema')
const jwt = require('jsonwebtoken')

let login = async (req, res) => {
    try {
        const { email, password, remember } = req.body

     
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

      
        let validEmail = emailRegex.test(email)
        if (!validEmail) {
            return res.status(401).json({
                success: false,
                message: "Please give a valid email"
            })
        }

   
        let validPassword = passwordRegex.test(password)
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Please give a valid password"
            })
        }

        
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

       
        if (!existingUser.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Verify First'
            })
        }

        
        let isPasswordMatched = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        
        let expire = remember ? '10d' : '1d';

        
        const token = jwt.sign(
            { 
                _id: existingUser._id, 
                email: existingUser.email, 
                role: existingUser.role 
            },
            process.env.JWT_VERIFY_SECRET,
            { expiresIn: expire }
        );

    
        await User.findByIdAndUpdate(existingUser._id, { isLogin: true });

        
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token, 
            data: {
                id: existingUser._id,
                fullName: existingUser.fullName,
                email: existingUser.email,
                role: existingUser.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = login;