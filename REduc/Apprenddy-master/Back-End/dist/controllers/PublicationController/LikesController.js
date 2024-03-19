"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _NotificationModel = require('../../models/UsersModel/NotificationModel'); var _NotificationModel2 = _interopRequireDefault(_NotificationModel);
var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

var _LikesModel = require('../../models/PublicationModel/LikesModel'); var _LikesModel2 = _interopRequireDefault(_LikesModel);
var _ConteudoModel = require('../../models/PublicationModel/ConteudoModel'); var _ConteudoModel2 = _interopRequireDefault(_ConteudoModel);

class LikesController {constructor() { LikesController.prototype.__init.call(this);LikesController.prototype.__init2.call(this);LikesController.prototype.__init3.call(this);LikesController.prototype.__init4.call(this);LikesController.prototype.__init5.call(this);LikesController.prototype.__init6.call(this);LikesController.prototype.__init7.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}
   __init2() {this._notificationModel = new (0, _NotificationModel2.default)()}
   __init3() {this._likeModel = new (0, _LikesModel2.default)()}
   __init4() {this._conteudoModel = new (0, _ConteudoModel2.default)()}

   __init5() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params

    const alreadyLiked = await this._likeModel.existsLike(Number(id_conteudo), userId)

    if (alreadyLiked) return res.status(401).json({ error: "Already liked" })

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: 'Content not found'})

    const data = {
      id_conteudo: Number(id_conteudo),
      id_usuario: userId
    }

    try {
      const id = await this._likeModel.createLike(data)

      const user = await this._userModel.GetAccount(userId)
      const userNotification = await this._conteudoModel.getUserPublication(Number(id_conteudo))

      if(Number(user.id_usuario) !==  Number(userNotification.id_usuario)){
        const notificationContent = `O ${user.nome}, curtiu a sua publicação!` 

        await this._notificationModel.createNotificacao(notificationContent, Number(userNotification.id_usuario))
      }

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init6() {this.get = async (req, res) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params

    const alreadyLiked = await this._likeModel.existsLike(Number(id_conteudo), userId)

    console.log(alreadyLiked);
    if(alreadyLiked)    return res.json({ resposta: true});
    else return res.json({ resposta: false});

    
  }}

   __init7() {this.delete = async (req, res) => {
    let { userId } = req.userSession
    let { id_conteudo } = req.params

    const alreadyLiked = await this._likeModel.existsLike(Number(id_conteudo), userId)

    if (!alreadyLiked) return res.status(401).json({ error: "Don't have Authorization" })

    const where = {
      id_conteudo: Number(id_conteudo),
      id_usuario: userId
    }

    try {
      await this._likeModel.deleteLike(where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new LikesController()