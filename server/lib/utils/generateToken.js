const jwt = require('jsonwebtoken')


const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days        
    });
    return token;
}

module.exports = generateTokenAndSetCookie;

