const router = require('express').Router();
const { validateToken } = require('../middlewares');
const { getAllAccounts, getAccountById } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);
router.get('/accounts', [getAllAccounts]);
router.get('/account/:id', [getAccountById]);

module.exports = router;
