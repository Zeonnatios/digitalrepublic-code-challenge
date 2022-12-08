const router = require('express').Router();
const { createAccount } = require('../controllers/accountController');
const { accountValidation, validateToken } = require('../middlewares');

router.use(validateToken);

router.post('/user/account/', [accountValidation, createAccount]);

module.exports = router;
