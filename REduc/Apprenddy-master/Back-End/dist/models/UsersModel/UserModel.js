"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);
var _ConteudoModel = require('../PublicationModel/ConteudoModel'); var _ConteudoModel2 = _interopRequireDefault(_ConteudoModel);
var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);

class UserModel extends _SimpleCRUD2.default {
  constructor () { super('usuarios');UserModel.prototype.__init.call(this);UserModel.prototype.__init2.call(this);UserModel.prototype.__init3.call(this);UserModel.prototype.__init4.call(this);UserModel.prototype.__init5.call(this);UserModel.prototype.__init6.call(this); }

   __init() {this._contents = new (0, _ConteudoModel2.default)()}

   __init2() {this.GetAccount = async (id_usuario) => {
    const user = await this.ReadWithWhereFirst({ id_usuario })

    if(!user) return;

    return this.OccultSecreatUserData(user)
  }}

   __init3() {this.DashBoard = async (id_usuario) => {
    const user = await this.GetAccount(id_usuario)

    if(!user) return;
    
    let likes = await this._contents.getUserPublicationsLiked(id_usuario)
    
    let contents = await this._contents.getUserPublications(id_usuario)
    
    likes = likes.map(conteudo => {
      conteudo.publicacao.data_publicacao = _FormatDate2.default.call(void 0, conteudo.publicacao.data_publicacao)
      return conteudo
    })
    console.log(likes);

    contents = contents.map(teste => {
      teste.publicacao.data_publicacao = _FormatDate2.default.call(void 0, teste.publicacao.data_publicacao)
      
      return teste
    })

    return { user, likes, contents }
  }}

   __init4() {this.indexUsuario = async () => {
    const getUsers = await this.Read()

    const users = getUsers.map(user => this.OccultSecreatUserData(user))

    return users
  }}

   __init5() {this.updateUsuario = async (data, id_usuario) => {
    await this.Update(data, { id_usuario })
  }}

   __init6() {this.OccultSecreatUserData = (user) => {
    user.senha = undefined
    user.resposta = undefined
    user.pergunta_seguranca = undefined

    return user
  }}
}

exports. default = UserModel