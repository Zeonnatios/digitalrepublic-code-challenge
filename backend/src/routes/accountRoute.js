const router = require('express').Router();
const { createAccount } = require('../controllers/accountController');
const { validateToken } = require('../middlewares/tokenValidation');

router.use(validateToken);

router.post('/user/account/', [createAccount]);

module.exports = router;
