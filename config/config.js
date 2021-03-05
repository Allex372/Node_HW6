module.exports = {
    MONGO_URL: 'mongodb://localhost:27017/OWU',
    PORT: 5000,
    JWT_ACCESS: process.env.JWT_ACCESS || 'JWT_ACCESS',
    JWT_REFRESH: process.env.JWT_REFRESH || 'JWT_REFRESH'
};
