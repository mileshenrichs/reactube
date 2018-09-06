const Config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: Config.db.PG_CONNECTION_OBJ
});

module.exports = knex;