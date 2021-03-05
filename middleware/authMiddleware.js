const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { errorMessages } = require('../error');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const { language = 'en' } = req.body;

            const access_token = req.get(constants.Authorization);

            if (!access_token) {
                res.json(errorMessages.TOKEN_REQUIRED[language]);
            }

            jwt.verify(access_token, 'JWT_ACCESS', (err) => {
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
};
