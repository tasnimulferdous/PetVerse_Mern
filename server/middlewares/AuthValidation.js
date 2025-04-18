const Joi = require('joi');
const jwt = require('jsonwebtoken');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        phone_number: Joi.string().min(10).max(15).required(),
        location: Joi.string().optional()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),
        phone_number: Joi.string().min(10).max(15).optional(),
        password: Joi.string().min(4).max(100).required()
    }).or('email', 'phone_number'); // Ensure at least one of email or phone_number is present

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error });
    }
    next();
};

const updateProfileValidation = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        name: Joi.string().min(3).max(100).optional(),
        email: Joi.string().email().optional(),
        phone_number: Joi.string().min(10).max(15).optional(),
        location: Joi.string().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error
        });
    }
    next();
};

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request object
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token.',
            success: false
        });
    }
};

module.exports = {
    signupValidation,
    loginValidation,
    updateProfileValidation,
    isAuthenticated
}
