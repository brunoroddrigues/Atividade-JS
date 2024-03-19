"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class UsersDashboard {constructor() { UsersDashboard.prototype.__init.call(this);UsersDashboard.prototype.__init2.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}

   __init2() {this.show = async (req, res) => {
    const { id } = req.params

    if(isNaN(Number(id))) {
      return res.status(400).json({ error: 'bad request'})
    }

    const userInfo = await this._userModel.DashBoard(Number(id))
    
    if(!userInfo) return res.status(404).json({ error: "User not Found" })

    return res.json(userInfo)
  }}
}

exports. default = new UsersDashboard()