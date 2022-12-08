const router = require('express').Router();
const { validateToken, accountValidation } = require('../middlewares');
const { getAllAccounts, getAccountById, deposit, withdraw,
  transfer } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);
router.get('/accounts', [getAllAccounts]);
router.get('/account/:id', [getAccountById]);
router.patch('/account/deposit/', [accountValidation, deposit]);
router.patch('/account/withdraw/', [accountValidation, withdraw]);
router.patch('/account/transfer/:accountNumber', [accountValidation, transfer]);

module.exports = router;
