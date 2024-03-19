"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class LikesModel extends _SimpleCRUD2.default {
  constructor () { super('likes_conteudo');LikesModel.prototype.__init.call(this);LikesModel.prototype.__init2.call(this);LikesModel.prototype.__init3.call(this); }

   __init() {this.existsLike = async (id_conteudo, id_usuario) => {
    const like = await this.ReadWithWhereFirst({ id_conteudo, id_usuario })

    return like 
  }}

   __init2() {this.createLike = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init3() {this.deleteLike =  async (where) => {
    await this.Delete(where)
  }}
}

exports. default = LikesModel