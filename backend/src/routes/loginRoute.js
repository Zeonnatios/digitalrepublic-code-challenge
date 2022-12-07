const router = require('express').Router();
const { login } = require('../controllers/loginController');
const { loginValidation } = require('../middlewares/loginValidation');

router.post('/login/', [loginValidation, login]);

module.exports = router;
