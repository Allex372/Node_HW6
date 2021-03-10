const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { errorMessages } = require('../error');
const { JWT_ACCESS, JWT_REFRESH } = require('../config/config');
const { authService } = require('../service');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const { language = 'en' } = req.body;

            const access_token = req.get(constants.Authorization);

            if (!access_token) {
                res.json(errorMessages.TOKEN_REQUIRED[language]);
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    throw new Error(errorMessages.NOT_VALID_TOKEN[language]);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');
            if (!tokens) {
                throw new Error(errorMessages.NOT_VALID_TOKEN[language]);
            }

            console.log('*************************************************************************');
            console.log(tokens);
            console.log('*************************************************************************');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.Authorization);

            if (!refresh_token) {
                res.json(errorMessages.TOKEN_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new Error(errorMessages.NOT_VALID_TOKEN);
                }
            });

            const tokens = await authService.findByParams({ refresh_token });

            if (!tokens) {
                throw new Error(errorMessages.NOT_VALID_TOKEN);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
