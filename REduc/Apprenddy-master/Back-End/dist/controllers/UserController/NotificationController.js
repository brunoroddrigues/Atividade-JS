"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _NotificationModel = require('../../models/UsersModel/NotificationModel'); var _NotificationModel2 = _interopRequireDefault(_NotificationModel);

class UsersController  {constructor() { UsersController.prototype.__init.call(this);UsersController.prototype.__init2.call(this);UsersController.prototype.__init3.call(this); }
   __init() {this._notificationModel = new (0, _NotificationModel2.default)()}

   __init2() {this.index = async (req, res) => {
    const { userId } = req.userSession

    const notificacoes = await this._notificationModel.indexNotificacao(userId)

    return res.json(notificacoes)
  }}

   __init3() {this.delete = async (req, res) => {
    const { userId } = req.userSession

    try {
      await this._notificationModel.deleteNotificacao(userId)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new UsersController ()