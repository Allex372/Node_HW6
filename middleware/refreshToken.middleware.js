const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { errorMessages } = require('../error');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.Authorization);

            if (!refresh_token) {
                res.json(errorMessages.TOKEN_REQUIRED);
            }

            jwt.verify(refresh_token, 'JWT_REFRESH', (err) => {
                if (err) {
                    throw new Error(errorMessages.NOT_VALID_TOKEN);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

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
