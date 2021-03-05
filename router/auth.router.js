const router = require('express').Router();

const { authController } = require('../controller');

const { authMiddleware } = require('../middleware');

router.post('/', authController.authController);

module.exports = router;
