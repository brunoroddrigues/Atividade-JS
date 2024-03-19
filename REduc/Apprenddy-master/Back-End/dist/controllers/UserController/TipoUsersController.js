"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class TipoUsersController  {constructor() { TipoUsersController.prototype.__init.call(this);TipoUsersController.prototype.__init2.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}

   __init2() {this.update = async (req, res) => {
    const { userId } = req.userSession
    const { email } = req.query
    const { id_tipo } = req.body

    if(!email || !id_tipo) return res.status(401).json({ error: 'Please, inform all data' })

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    try {
      await this._userModel.Update({ id_tipo: Number(id_tipo) }, { email })

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new TipoUsersController ()