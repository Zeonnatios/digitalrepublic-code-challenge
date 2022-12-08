const router = require('express').Router();
const { validateToken } = require('../middlewares');
// const {  } = require('../controllers/accountController');

router.use(validateToken);

// router.post('/user/account/', [accountValidation, createAccount]);

module.exports = router;
