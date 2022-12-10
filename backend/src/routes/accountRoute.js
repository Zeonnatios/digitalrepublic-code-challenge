const router = require('express').Router();
const { validateToken, accountValidation, transferValidation } = require('../middlewares');
const { getAllAccounts, getAccountById, deposit, withdraw,
  transfer } = require('../controllers/accountController');

router.use(validateToken);

router.get('/accounts', [getAllAccounts]);
router.get('/account/', [getAccountById]);
router.patch('/account/deposit/', [accountValidation, deposit]);
router.patch('/account/withdraw/', [accountValidation, withdraw]);
router.patch('/account/transfer/:accountNumber', [transferValidation, transfer]);

module.exports = router;
