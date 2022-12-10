const router = require('express').Router();
const { login, register, getAllUsers } = require('../controllers/userController');
const { loginValidation, registerValidation } = require('../middlewares');

router.get('/users', [getAllUsers]);
router.post('/login/', [loginValidation, login]);
router.post('/user/register', [registerValidation, register]);

module.exports = router;
