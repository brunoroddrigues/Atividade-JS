"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../../database/connection'); var _connection2 = _interopRequireDefault(_connection);

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class RespostaModel extends _SimpleCRUD2.default {
  constructor () { super('respostas_topico');RespostaModel.prototype.__init.call(this);RespostaModel.prototype.__init2.call(this);RespostaModel.prototype.__init3.call(this); }

   __init() {this.createResposta = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init2() {this.indexResposta = async (pages, order, id_topico_comunidade) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }
    
    const respostas = await _connection2.default.call(void 0, "respostas_topico")
      .innerJoin('usuarios', 'usuarios.id_usuario', 'respostas_topico.id_usuario')
      .where('respostas_topico.id_topico_comunidade', id_topico_comunidade)
      .select([
        "respostas_topico.*",
        "usuarios.nome as usuarios_nome"
      ])
      .groupBy('respostas_topico.id_resposta_topico')
      .orderBy('respostas_topico.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)
    
    return respostas
  }}

   __init3() {this.updateResposta = async (data, where) => {
    await this.Update(data, where)
  }}
}

exports. default = RespostaModel