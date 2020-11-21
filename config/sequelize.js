const { Sequelize } = require('sequelize');
const config = require('./config');

const sql = new Sequelize(
  config.DB.NAME,
  config.DB.USER,
  config.DB.PASS,
  {
    dialect: 'postgres',
    host: config.DB.HOST,
    port: config.DB.PORT,
    define: {
      underscored: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_unicode_ci',
      },
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  },
);

function testConnection(connection = sql, callback = () => {}) {
  connection.authenticate().then(() => {
    console.info('Connection has been established successfully');
    callback();
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  testConnection,
  connection: sql,
  dataTypes: Sequelize.DataTypes
}
