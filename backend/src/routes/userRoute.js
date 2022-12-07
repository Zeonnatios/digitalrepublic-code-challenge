const router = require('express').Router();
const { login, register } = require('../controllers/userController');
const { loginValidation, registerValidation } = require('../middlewares');

router.post('/login/', [loginValidation, login]);
router.post('/user/register', [registerValidation, register]);

module.exports = router;
