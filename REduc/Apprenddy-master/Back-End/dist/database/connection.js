"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _knex = require('knex'); var _knex2 = _interopRequireDefault(_knex);

var _databasejson = require('../configs/database.json');

const connection = _knex2.default.call(void 0, { 
  client: 'mysql',
  connection: { host: _databasejson.host, user: _databasejson.user, password: _databasejson.password, database: _databasejson.database },
  useNullAsDefault: true
});

exports. default = connection;
