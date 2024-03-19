"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _TagsModel = require('../../models/PublicationModel/TagsModel'); var _TagsModel2 = _interopRequireDefault(_TagsModel);

class TagsController {constructor() { TagsController.prototype.__init.call(this);TagsController.prototype.__init2.call(this);TagsController.prototype.__init3.call(this);TagsController.prototype.__init4.call(this);TagsController.prototype.__init5.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}
   __init2() {this._tagsModel = new (0, _TagsModel2.default)()}

   __init3() {this.index = async (req, res) => {
    const { limit } = req.query
    const { id_tag } = req.query

    if(!limit) return res.status(400).json({ error: 'limit not informed' })
    if(Number(limit) <= 0) return res.status(401).json({ error: 'limit is not valid' })

    let tag = []

    if(Number(id_tag) > 0) tag = await this._tagsModel.indexTagId(Number(id_tag))
    else tag = await this._tagsModel.indexTags(Number(limit))

    return res.json(tag)
  }}

   __init4() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { descritivo } = req.body

    const existsTag = await this._tagsModel.existsTags(descritivo)

    if(existsTag) return res.status(401).json({ error: 'Tag alredy exists'})

    const user = await this._userModel.GetAccount(userId)

    if(user.id_tipo === 1) return res.status(401).json({ error: 'Don\'t have authorization' })

    if(!descritivo) return res.status(400).json({ error: "'descritivo' no content" })

    try {
      const id = await this._tagsModel.createTags(descritivo)

      return res.json({ id, descritivo })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init5() {this.update = async (req, res) => {
    const { id_tag } = req.params
    const { descritivo } = req.body

    const getTag = await this._tagsModel.ReadWithWhereFirst({ id_tag })

    if(!getTag) return res.status(401).json({ error: 'Tag don\'t exists' })

    const existsTag = await this._tagsModel.existsTags(descritivo)
    
    if(existsTag && existsTag.id_tag != Number(id_tag)) 
      return res.status(401).json({ error: 'Tag alredy exists' })

    try {
      await this._tagsModel.updateTags(Number(id_tag), descritivo)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}
}

exports. default = new TagsController()