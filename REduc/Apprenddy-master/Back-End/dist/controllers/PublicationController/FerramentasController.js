"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _FerramentasModel = require('../../models/PublicationModel/FerramentasModel'); var _FerramentasModel2 = _interopRequireDefault(_FerramentasModel);

class FerramentasController {constructor() { FerramentasController.prototype.__init.call(this);FerramentasController.prototype.__init2.call(this);FerramentasController.prototype.__init3.call(this);FerramentasController.prototype.__init4.call(this);FerramentasController.prototype.__init5.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}
   __init2() {this._ferramentasModel = new (0, _FerramentasModel2.default)()}

   __init3() {this.index = async (req, res) => {
    const { id_ferramenta } = req.query

    let ferramenta = []

    if(Number(id_ferramenta) > 0) ferramenta = await this._ferramentasModel.indexFerramentasId(Number(id_ferramenta))
    else ferramenta = await this._ferramentasModel.indexFerramentas()

    return res.json(ferramenta)
  }}

   __init4() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { descritivo, icone, id_categoria } = req.body

    if(!descritivo || !icone || !id_categoria) 
      return res.status(401).json({ error: 'Please, inform all data' })

    const existsTool = await this._ferramentasModel.existsFerramentas(descritivo)

    if(existsTool) return res.status(401).json({ error: 'Tool alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    const data = {
      descritivo: String(descritivo).trim(),
      icone: String(icone),
      id_categoria: Number(id_categoria)
    }

    try {
      const id = await this._ferramentasModel.createFerramentas(data)

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init5() {this.update = async (req, res) => {
    const { id_ferramenta } = req.params
    const { descritivo, icone, id_categoria } = req.body

    const getTool = await this._ferramentasModel.ReadWithWhereFirst({ id_ferramenta })

    if(!getTool) return res.status(401).json({ error: 'Tool don\'t exists' })

    const existsTool = await this._ferramentasModel.existsFerramentas(descritivo)
    
    if(existsTool && existsTool.id_ferramenta != Number(id_ferramenta)) 
      return res.status(401).json({ error: 'Tool alredy exists' })

    const data = {
      descritivo: String(descritivo).trim(),
      icone: String(icone),
      id_categoria: Number(id_categoria)
    }

    try {
      await this._ferramentasModel.updateFerramentas(data, Number(id_ferramenta))

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new FerramentasController()