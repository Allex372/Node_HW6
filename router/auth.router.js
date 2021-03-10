const router = require('express').Router();

const { authController } = require('../controller');

const { authMiddleware } = require('../middleware');

router.post('/', authController.authController);

router.post('/refresh', authMiddleware.refreshToken, authController.refreshToken);

module.exports = router;
