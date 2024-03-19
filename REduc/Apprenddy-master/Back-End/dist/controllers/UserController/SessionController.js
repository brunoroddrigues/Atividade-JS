"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _GenerateToken = require('../../utils/GenerateToken'); var _GenerateToken2 = _interopRequireDefault(_GenerateToken);

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _SessionsModel = require('../../models/UsersModel/SessionsModel'); var _SessionsModel2 = _interopRequireDefault(_SessionsModel);

var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _nowDateUTC = require('../../utils/nowDateUTC'); var _nowDateUTC2 = _interopRequireDefault(_nowDateUTC);

class SessionsController {constructor() { SessionsController.prototype.__init.call(this);SessionsController.prototype.__init2.call(this);SessionsController.prototype.__init3.call(this);SessionsController.prototype.__init4.call(this);SessionsController.prototype.__init5.call(this);SessionsController.prototype.__init6.call(this);SessionsController.prototype.__init7.call(this);SessionsController.prototype.__init8.call(this); }
   __init() {this._sessionModel = new (0, _SessionsModel2.default)()}
   __init2() {this._userModel = new (0, _UserModel2.default)()}

   __init3() {this.signup = async (req, res) => {
    let { email, nome, senha } = req.body

    const existAccount = await this._sessionModel.existAccount(String(email))

    if (existAccount) return res.status(409).json({ error: 'E-mail exists, try again' })

    try {
      const data = await this.FactoryCreateAccountData(String(email), String(nome), String(senha))

      const id = await this._sessionModel.createAccount(data)

      const token = _GenerateToken2.default.call(void 0, id)

      return res.json({ token })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init4() {this.signin = async (req, res) => {
    const { email, senha } = req.body

    const user = await this._sessionModel.getPassword(String(email))

    if (!user) return res.status(404).json({ error: 'User Not Found' })

    const verifyPassword = await _bcryptjs2.default.compare(String(senha), user.senha)

    if (!verifyPassword) return res.status(401).json({ error: 'Invalid Password' })

    const token = _GenerateToken2.default.call(void 0, user.id_usuario)

    return res.json({ token })
  }}

   __init5() {this.forgotPassword = async (req, res) => {
    const { email, pergunta_seguranca, resposta } = req.body
    
    if(!email || !pergunta_seguranca || !resposta) {
      return res.status(400).json({ error: "Bad Request" })
    }

    const getAccount = await this._userModel.ReadWithWhereFirst({ email, pergunta_seguranca, resposta })

    if(!getAccount) return res.status(401).json({ error: "Invalid Answer" })

    const token = _GenerateToken2.default.call(void 0, getAccount.id_usuario)

    return res.json({ token })
  }}

   __init6() {this.changePassword = async (req, res) => {
    const { userId } = req.userSession
    const { senha } = req.body

    try {
      const password = await _bcryptjs2.default.hash(senha, 10) 

      await this._userModel.Update({ senha: password }, { id_usuario: userId })

      return res.send()
    } catch(e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init7() {this.changeSecurity = async (req, res) => {
    const { userId } = req.userSession
    const { pergunta_seguranca, resposta, senha } = req.body

    const password = await _bcryptjs2.default.hash(senha, 10) 

    const data = {
      senha: password,
      pergunta_seguranca: String(pergunta_seguranca).trim(),  
      resposta: String(resposta).trim(),  
    }

    try {
      await this._userModel.updateUsuario(data, Number(userId))
      
      return res.send('')
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init8() {this.FactoryCreateAccountData = async (email, nome, password) => {
    const isFirstUserCreate = await this._userModel.ReadWithLimit(2)

    const date = _nowDateUTC2.default.call(void 0, )
    const data_entrada = _FormatDate2.default.call(void 0, date)

    const id_tipo = isFirstUserCreate.length > 0 ? 1 : 3
    
    const senha = await _bcryptjs2.default.hash(password, 10)

    return { email, nome, senha, id_tipo, data_entrada }
  }}
}

exports. default = new SessionsController()