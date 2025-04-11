const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        phone_number: Joi.string().min(10).max(15).required()
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

module.exports = {
    signupValidation,
    loginValidation,
    updateProfileValidation
}
