"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _tokenConfigjson = require('../auth/configs/tokenConfig.json');

function GenerateToken (id) {
  const token = _jsonwebtoken2.default.sign({ id }, _tokenConfigjson.hash, _tokenConfigjson.options)

  return token
}

exports. default = GenerateToken