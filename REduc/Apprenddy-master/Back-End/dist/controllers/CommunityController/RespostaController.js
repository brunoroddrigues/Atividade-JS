"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _NotificationModel = require('../../models/UsersModel/NotificationModel'); var _NotificationModel2 = _interopRequireDefault(_NotificationModel);

var _RespostaModel = require('../../models/CommunityModel/RespostaModel'); var _RespostaModel2 = _interopRequireDefault(_RespostaModel);
var _TopicoModel = require('../../models/CommunityModel/TopicoModel'); var _TopicoModel2 = _interopRequireDefault(_TopicoModel);

var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _nowDateUTC = require('../../utils/nowDateUTC'); var _nowDateUTC2 = _interopRequireDefault(_nowDateUTC);

class TopicoController {constructor() { TopicoController.prototype.__init.call(this);TopicoController.prototype.__init2.call(this);TopicoController.prototype.__init3.call(this);TopicoController.prototype.__init4.call(this);TopicoController.prototype.__init5.call(this);TopicoController.prototype.__init6.call(this);TopicoController.prototype.__init7.call(this); }
   __init() {this._topicoModel = new (0, _TopicoModel2.default)()}
   __init2() {this._respostaModel = new (0, _RespostaModel2.default)()}
   __init3() {this._userModel = new (0, _UserModel2.default)()}
   __init4() {this._notificationModel = new (0, _NotificationModel2.default)()}
  
   __init5() {this.index = async (req, res) => {
    const { pages, order } = req.query
    const { id_topico_comunidade } = req.params

    let respostas = await this._respostaModel.indexResposta(Number(pages), String(order), Number(id_topico_comunidade))

    respostas = respostas.map(resposta => {
      resposta.data_publicacao = _FormatDate2.default.call(void 0, resposta.data_publicacao)
      
      return resposta
    })

    return res.json(respostas)
  }}

   __init6() {this.store = async (req, res) => {
    const { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { conteudo } = req.body
    
    if(!conteudo) return res.status(401).json({ error: 'Please, inform answer content' })

    const data = this.factoryContent(userId, conteudo, Number(id_topico_comunidade))

    try {
      const id = await this._respostaModel.createResposta(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._topicoModel.getUserPublication(Number(id_topico_comunidade))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, respondeu o seu post!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init7() {this.update = async (req, res) => {
    let { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { conteudo } = req.body
    
    const existsTopico = await this._topicoModel.existsTopico(Number(id_topico_comunidade))

    if(!existsTopico) return res.status(404).json({ error: 'Topic not Found' })

    const where = {
      id_topico_comunidade: Number(id_topico_comunidade),
      id_usuario: userId
    }

    try {
      await this._respostaModel.updateResposta({ conteudo }, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}

   factoryContent(id_usuario, conteudo, id_topico_comunidade) {
    const data_publicacao = _nowDateUTC2.default.call(void 0, )
    
    return { id_usuario, conteudo, id_topico_comunidade, data_publicacao }
  }
}

exports. default = new TopicoController()