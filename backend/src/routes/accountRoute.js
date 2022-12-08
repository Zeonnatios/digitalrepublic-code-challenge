const router = require('express').Router();
const { validateToken, accountValidation } = require('../middlewares');
const { getAllAccounts, getAccountById, deposit, withdraw } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);
router.get('/accounts', [getAllAccounts]);
router.get('/account/:id', [getAccountById]);
router.get('/account/:id', [getAccountById]);
router.patch('/account/deposit/:id', [accountValidation, deposit]);
router.patch('/account/withdraw/:id', [accountValidation, withdraw]);

module.exports = router;
