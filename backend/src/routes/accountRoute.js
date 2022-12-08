const router = require('express').Router();
const { validateToken } = require('../middlewares');
const { getAllAccounts, getAccountById, deposit, withdraw } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);
router.get('/accounts', [getAllAccounts]);
router.get('/account/:id', [getAccountById]);
router.get('/account/:id', [getAccountById]);
router.patch('/account/deposit/:id', [deposit]);
router.patch('/account/withdraw/:id', [withdraw]);

module.exports = router;
