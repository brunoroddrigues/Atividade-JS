"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class UsersController  {constructor() { UsersController.prototype.__init.call(this);UsersController.prototype.__init2.call(this);UsersController.prototype.__init3.call(this);UsersController.prototype.__init4.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}

   __init2() {this.index = async (req, res) => {
    const users = await this._userModel.indexUsuario()

    return res.json(users)
  }}

   __init3() {this.show = async (req, res) => {
    const { userId } = req.userSession

    const user = await this._userModel.GetAccount(userId)

    if(!user) return res.status(404).json({ error: "User not Found" })

    return res.json(user)
  }}

   __init4() {this.update = async (req, res) => {
    const { userId } = req.userSession
    const { nome, email, foto_perfil, texto_perfil, capa_perfil } = req.body

    const getAccount = await this._userModel.GetAccount(Number(userId))
    
    if(!getAccount) return res.status(404).json({ error: 'User not Found' })

    if(!email) return res.status(400).json({ error: "E-mail is required"}) 

    const existsMail = await this._userModel.ReadWithWhereFirst({ email })

    if(existsMail && existsMail.email != email) 
      return res.status(401).json({ error: 'E-mail alredy exists' })
      
    let data = {
      nome: String(nome).trim(),
      email: String(email).trim(),
      foto_perfil: String(foto_perfil).trim(),  
      texto_perfil: String(texto_perfil).trim(),
      capa_perfil: String(capa_perfil),
     
    }
    
    try {
      await this._userModel.updateUsuario(data, Number(userId))
      
      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new UsersController ()