const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        
        const u = new UserModel(req.body);
        u.password = await bcrypt.hash(password, 10);
        await u.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true,
                userId: u._id
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, phone_number, password } = req.body;

        if (!email && !phone_number) {
            return res.status(400).json({
                message: 'Either email or phone_number must be provided',
                success: false
            });
        }

        const user = email
            ? await UserModel.findOne({ email })
            : await UserModel.findOne({ phone_number });

        const errorMsg = 'Auth failed email/phone or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login Success',
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, email, phone_number, location } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false
            });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, phone_number, location },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'User profile updated successfully',
            success: true,
            user: updatedUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false
            });
        }

        const user = await UserModel.findById(userId).select('-password'); // Exclude password from the result

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'User profile fetched successfully',
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    login,
    updateUserProfile,
    getUserProfile
}