const router = require('express').Router();
const { validateToken } = require('../middlewares');
const { getAllAccounts } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);
router.get('/accounts', [getAllAccounts]);

module.exports = router;
