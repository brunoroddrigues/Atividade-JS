"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../../database/connection'); var _connection2 = _interopRequireDefault(_connection);

var _UserModel = require('../UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class TopicoModel extends _SimpleCRUD2.default {
   __init() {this._userModel = new (0, _UserModel2.default)()}
  
  constructor () { super('topicos_comunidade');TopicoModel.prototype.__init.call(this);TopicoModel.prototype.__init2.call(this);TopicoModel.prototype.__init3.call(this);TopicoModel.prototype.__init4.call(this);TopicoModel.prototype.__init5.call(this);TopicoModel.prototype.__init6.call(this); }

   __init2() {this.getUserPublication = async (id_topico_comunidade) => {
    const publication = await this.ReadWithWhereFirst({ id_topico_comunidade })

    const user = await this._userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user
  }}

   __init3() {this.existsTopico = async (id_topico_comunidade) => {
    const topico = await this.ReadWithWhereFirst({ id_topico_comunidade })

    return topico
  }}

   __init4() {this.createTopico = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init5() {this.indexTopico = async (pages, order) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }

    const topicos = await _connection2.default.call(void 0, "topicos_comunidade")
      .innerJoin('usuarios', 'usuarios.id_usuario', 'topicos_comunidade.id_usuario')
      .leftJoin('respostas_topico', 'respostas_topico.id_topico_comunidade', 'topicos_comunidade.id_topico_comunidade')
      .select([
        "topicos_comunidade.*",
        "usuarios.nome as usuarios_nome"
      ])
      .count('respostas_topico.id_topico_comunidade as respostas')
      .groupBy('topicos_comunidade.id_topico_comunidade')
      .orderBy('topicos_comunidade.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)

    return topicos
  }}

   __init6() {this.updateTopico = async (data, where) => {
    await this.Update(data, where)
  }}
}

exports. default = TopicoModel