"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class NotificationModel extends _SimpleCRUD2.default {
  constructor () { super('notificacoes');NotificationModel.prototype.__init.call(this);NotificationModel.prototype.__init2.call(this);NotificationModel.prototype.__init3.call(this); }

   __init() {this.createNotificacao = async (conteudo, id_usuario) => {
    await this.Create({ conteudo, id_usuario })
  }}

   __init2() {this.indexNotificacao = async (id_usuario) => {
    const notificacoes = await this.ReadWithWhere({ id_usuario })
    
    return notificacoes
  }}

   __init3() {this.deleteNotificacao = async (id_usuario) => {
    await this.Delete({ id_usuario })
  }}
}

exports. default = NotificationModel