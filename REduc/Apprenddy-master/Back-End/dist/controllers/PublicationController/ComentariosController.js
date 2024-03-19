"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _NotificationModel = require('../../models/UsersModel/NotificationModel'); var _NotificationModel2 = _interopRequireDefault(_NotificationModel);
var _ConteudoModel = require('../../models/PublicationModel/ConteudoModel'); var _ConteudoModel2 = _interopRequireDefault(_ConteudoModel);
var _ComentariosModel = require('../../models/PublicationModel/ComentariosModel'); var _ComentariosModel2 = _interopRequireDefault(_ComentariosModel);

var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _nowDateUTC = require('../../utils/nowDateUTC'); var _nowDateUTC2 = _interopRequireDefault(_nowDateUTC);

class ComentariosController {constructor() { ComentariosController.prototype.__init.call(this);ComentariosController.prototype.__init2.call(this);ComentariosController.prototype.__init3.call(this);ComentariosController.prototype.__init4.call(this);ComentariosController.prototype.__init5.call(this);ComentariosController.prototype.__init6.call(this);ComentariosController.prototype.__init7.call(this);ComentariosController.prototype.__init8.call(this); }
   __init() {this._comentariosModel = new (0, _ComentariosModel2.default)()}
   __init2() {this._userModel = new (0, _UserModel2.default)()}
   __init3() {this._notificationModel = new (0, _NotificationModel2.default)()}
   __init4() {this._conteudoModel = new (0, _ConteudoModel2.default)()}

   __init5() {this.index = async (req, res) => {
    const { id_conteudo } = req.params
    const { pages, order } = req.query

    let comentarios;
    console.log(id_conteudo);
    if(Number(id_conteudo) > 0){
       comentarios = await this._comentariosModel.indexComentarios(Number(pages), String(order), Number(id_conteudo))
    }else{
       comentarios = await this._comentariosModel.indexTodosComentarios()
      
    }  

    comentarios = comentarios.map(comentario => {
      comentario.data_publicacao = _FormatDate2.default.call(void 0, comentario.data_publicacao)
      
      return comentario
    })

    return res.json(comentarios)
  }}

   __init6() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params
    let { conteudo } = req.body
    
    if(!conteudo) return res.status(401).json({ error: 'Please, inform message content' })

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: "Content not found"})

    const data = this.factoryMessage(Number(id_conteudo), userId, conteudo)

    try {
      const id = await this._comentariosModel.createComentario(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._conteudoModel.getUserPublication(Number(id_conteudo))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, comentou em sua publicação!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }
      
      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init7() {this.update = async (req, res) => {
    let { userId } = req.userSession
    const { id_comentario } = req.params
    const { conteudo } = req.body

    const where = {
      id_usuario: userId,
      id_comentario: Number(id_comentario)
    }

    const existsComentario = await this._comentariosModel.existsComentario(where)

    if(!existsComentario) return res.status(401).json({ error: 'Commentary don\'t exists' })

    try {
      await this._comentariosModel.updateComentario({ conteudo }, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}

   __init8() {this.delete = async (req, res) => {
    let { userId } = req.userSession
    const { id_comentario } = req.params

    const where = {
      
      id_comentario: Number(id_comentario)
    }

    const existsComentario = await this._comentariosModel.existsComentario(where)

    if(!existsComentario) return res.status(401).json({ error: 'Commentary don\'t exists' })

    try {
      await this._comentariosModel.deleteComentario(where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}


   factoryMessage(id_conteudo, id_usuario, conteudo) {
    const data_publicacao = _nowDateUTC2.default.call(void 0, )
    
    return { id_conteudo, id_usuario, conteudo, data_publicacao }
  }
}

exports. default = new ComentariosController()