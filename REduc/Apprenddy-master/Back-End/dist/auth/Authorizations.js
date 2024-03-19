"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _tokenConfigjson = require('./configs/tokenConfig.json');







var _UserModel = require('../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class Authorization {constructor() { Authorization.prototype.__init.call(this);Authorization.prototype.__init2.call(this);Authorization.prototype.__init3.call(this); }
   __init() {this._model = new (0, _UserModel2.default)()}

   __init2() {this.show = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) return res.status(401).json({ error: 'No Token Provided' })

    const [schema, token] = auth.split(' ')

    if (!/^Bearer$/i.test(schema) || !token) return res.status(401).json({ error: 'Token Malformed' })

    _jsonwebtoken2.default.verify(token, _tokenConfigjson.hash, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token Invalid' })

      const userId = decoded.id
      const user = await this._model.GetAccount(userId)
      
      if (!user) return res.status(404).json({ error: 'User not Found' })
      
      req.userSession = { userId }

      return next()
    })
  }}

   __init3() {this.authenticated = (req, res) => {
    // Essa função vai servir para authenticar no front-end
    res.send('')
  }}
}

exports. default = new Authorization()