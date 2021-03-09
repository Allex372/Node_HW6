const router = require('express').Router();

const { authController } = require('../controller');

const { refreshTokenMiddleware } = require('../middleware');

router.post('/', authController.authController);

router.post('/refresh', refreshTokenMiddleware.refreshToken, authController.refreshToken);

module.exports = router;
