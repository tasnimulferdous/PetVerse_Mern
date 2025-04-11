const { signup, login, updateUserProfile, getUserProfile } = require('../controllers/AuthController');
const { signupValidation, loginValidation, updateProfileValidation } = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login_1068', loginValidation, login);
router.post('/signup_1068', signupValidation, signup);
router.put('/update_profile_1068', updateProfileValidation, updateUserProfile);
router.get('/get_profile_1068/:userId', getUserProfile);

router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

module.exports = router;