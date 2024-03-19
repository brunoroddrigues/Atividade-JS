"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class SessionsModel extends _SimpleCRUD2.default {
  constructor () { super('usuarios');SessionsModel.prototype.__init.call(this);SessionsModel.prototype.__init2.call(this);SessionsModel.prototype.__init3.call(this); }

   __init() {this.getPassword = async (email) => {
    const user = await this.ReadReturnSelectWithWhereFirst(['id_usuario', 'senha'], { email })

    return user
  }}

   __init2() {this.existAccount = async (email) => {
    const user = await this.ReadWithWhereFirst({ email })

    return user
  }}

   __init3() {this.createAccount = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}
}

exports. default = SessionsModel