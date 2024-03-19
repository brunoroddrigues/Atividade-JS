"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _CategoriaModel = require('../../models/PublicationModel/CategoriaModel'); var _CategoriaModel2 = _interopRequireDefault(_CategoriaModel);

class CategoriaController {constructor() { CategoriaController.prototype.__init.call(this);CategoriaController.prototype.__init2.call(this);CategoriaController.prototype.__init3.call(this);CategoriaController.prototype.__init4.call(this);CategoriaController.prototype.__init5.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}
   __init2() {this._categoriaModel = new (0, _CategoriaModel2.default)()}

   __init3() {this.index = async (req, res) => {
    const { limit } = req.query
    const { id_categoria } = req.query

    if(!limit) return res.status(400).json({ error: 'limit not informed' })
    if(Number(limit) <= 0) return res.status(401).json({ error: 'limit is not valid' })

    let category = []

    if(Number(id_categoria) > 0) category = await this._categoriaModel.indexCategoriaId(Number(id_categoria))
    else category = await this._categoriaModel.indexCategoria(Number(limit))
    return res.json(category)
  }}

   __init4() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { descritivo } = req.body

    const existsCategory = await this._categoriaModel.existsCategoria(descritivo)

    if(existsCategory) return res.status(401).json({ error: 'category alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    if(!descritivo) return res.status(400).json({ error: "'descritivo' no content"})

    try {
      const id = await this._categoriaModel.createCategoria(descritivo)

      return res.json({ id, descritivo })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init5() {this.update = async (req, res) => {
    const { id_categoria } = req.params
    const { descritivo } = req.body

    const getCategory = await this._categoriaModel.ReadWithWhereFirst({ id_categoria })

    if(!getCategory) return res.status(401).json({ error: 'category don\'t exists'})

    const existsCategory = await this._categoriaModel.existsCategoria(descritivo)
    
    if(existsCategory && existsCategory.id_categoria != Number(id_categoria)) 
      return res.status(401).json({ error: 'category alredy exists'})

    try {
      await this._categoriaModel.updateCategoria(Number(id_categoria), descritivo)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new CategoriaController()