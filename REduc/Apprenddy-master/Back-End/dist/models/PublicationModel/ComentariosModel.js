"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../../database/connection'); var _connection2 = _interopRequireDefault(_connection);

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class CommentariosModel extends _SimpleCRUD2.default {
  constructor () { super('comentarios');CommentariosModel.prototype.__init.call(this);CommentariosModel.prototype.__init2.call(this);CommentariosModel.prototype.__init3.call(this);CommentariosModel.prototype.__init4.call(this);CommentariosModel.prototype.__init5.call(this);CommentariosModel.prototype.__init6.call(this); }

   __init() {this.existsComentario = async (where) => {
    const comentario = await this.ReadWithWhereFirst(where)

    return comentario
  }}
   __init2() {this.indexTodosComentarios = async () => {
    
    const comentarios = await _connection2.default.call(void 0, 'comentarios')
      .innerJoin('usuarios', 'usuarios.id_usuario', 'comentarios.id_usuario')
      .innerJoin('conteudos', 'conteudos.id_conteudo', 'comentarios.id_conteudo')
      .select([
        'comentarios.*',
        'usuarios.nome as usuario_nome',
        'usuarios.foto_perfil as usuario_foto',
      ])
      .groupBy('comentarios.id_comentario')
      .orderBy('comentarios.data_publicacao')
      
    return comentarios
  }}

   __init3() {this.indexComentarios = async (pages, order, id_conteudo) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }

    const comentarios = await _connection2.default.call(void 0, 'comentarios')
      .innerJoin('usuarios', 'usuarios.id_usuario', 'comentarios.id_usuario')
      .innerJoin('conteudos', 'conteudos.id_conteudo', 'comentarios.id_conteudo')
      .where('comentarios.id_conteudo', id_conteudo)
      .select([
        'comentarios.*',
        'usuarios.nome as usuario_nome',
        'usuarios.foto_perfil as usuario_foto',
      ])
      .groupBy('comentarios.id_comentario')
      .orderBy('comentarios.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)

    return comentarios
  }}

   __init4() {this.createComentario = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init5() {this.updateComentario =  async (data, where) => {
    await this.Update(data, where)
  }}

   __init6() {this.deleteComentario =  async (where) => {
    await this.Delete(where)
  }}
}

exports. default = CommentariosModel