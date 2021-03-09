const { O_Auth } = require('../dataBase/models');
const { passwordsHasher, tokenizer } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authController: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await authService.findUser(email);

            await passwordsHasher.compare(password, user.password);

            const tokens = tokenizer();

            await O_Auth.create({ ...tokens, _user_id: user._id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { _user_Id, _id } = req.tokenInfo;

            const tokens = tokenizer();

            await O_Auth.findByIdAndUpdate(_id, { ...tokens, _user_Id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
