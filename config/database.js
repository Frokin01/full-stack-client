const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://default:YcwDB80QunNr@ep-proud-frost-a2y199y6.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require', {
  dialect: 'postgres',
});

module.exports = sequelize;
