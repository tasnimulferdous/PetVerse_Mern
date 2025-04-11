const { signup, login, updateUserProfile, getUserProfile, logout } = require('../controllers/AuthController');
const { signupValidation, loginValidation, updateProfileValidation, isAuthenticated } = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login_1068', loginValidation, login);
router.post('/signup_1068', signupValidation, signup);
router.put('/update_profile_1068', isAuthenticated, updateProfileValidation, updateUserProfile);
router.get('/get_profile_1068/:userId', isAuthenticated, getUserProfile);
router.post('/logout_1068', isAuthenticated, logout);

router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

module.exports = router;