const { errorCodes } = require('../constant');
const { User } = require('../dataBase/models');
const { userValidators } = require('../validators');
const { errorMessages } = require('../error');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isEmailCreated: async (req, res, next) => {
        try {
            const { email, language = 'en' } = req.body;

            const user = await User.findOne({ email });
            if (user) {
                throw new Error(errorMessages.EMAIL_EXIST[language]);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isLoginExisted: async (req, res, next) => {
        try {
            const { name } = req.body;

            const user = await User.findOne({ name });
            if (user) {
                throw new Error(`Name: ${name} already exist`);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
