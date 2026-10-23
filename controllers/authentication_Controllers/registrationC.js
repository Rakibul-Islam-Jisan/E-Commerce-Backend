const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');
const sendEmail = require('../../utils/sendEmail'); 

const registration = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, terms, role } = req.body;

        if (!fullName || !email || !password || !confirmPassword || !terms) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please give a valid email"
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Please give a valid password"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: "Passwords do not match" 
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashpassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashpassword,
            terms,
            role
        });
        
        await newUser.save();

        
        const token = jwt.sign(
            { 
                _id: newUser._id, 
                email: newUser.email, 
                role: newUser.role 
            },
            process.env.JWT_VERIFY_SECRET,
            { expiresIn: "30d" }
        );

     
        

        
        await sendEmail({
            to: newUser.email,
            type: 'VERIFY_EMAIL',
            token:token
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful! Please check your email."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = registration;