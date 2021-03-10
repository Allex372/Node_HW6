const { User, O_Auth } = require('../dataBase/models');

module.exports = {
    findUser: (email) => User.findOne({ email }),

    findByParams: (filterObject) => O_Auth.findOne(filterObject)

};
