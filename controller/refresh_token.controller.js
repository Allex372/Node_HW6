const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { errorMessages } = require('../error');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    refreshToken: async (req, res, next) => {
        try {

        } catch (e) {
            res.json(e.message);
        }
    },
};
