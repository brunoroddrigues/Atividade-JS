"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _TopicoModel = require('../../models/CommunityModel/TopicoModel'); var _TopicoModel2 = _interopRequireDefault(_TopicoModel);

var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _nowDateUTC = require('../../utils/nowDateUTC'); var _nowDateUTC2 = _interopRequireDefault(_nowDateUTC);

class TopicoController {constructor() { TopicoController.prototype.__init.call(this);TopicoController.prototype.__init2.call(this);TopicoController.prototype.__init3.call(this);TopicoController.prototype.__init4.call(this); }
   __init() {this._topicoModel = new (0, _TopicoModel2.default)()}

   __init2() {this.index = async (req, res) => {
    const { pages, order } = req.query

    let topicos = await this._topicoModel.indexTopico(Number(pages), String(order))

    topicos = topicos.map(topico => {
      topico.data_publicacao = _FormatDate2.default.call(void 0, topico.data_publicacao)
      
      return topico
    })

    return res.json(topicos)
  }}

   __init3() {this.store = async (req, res) => {
    let { userId } = req.userSession
    let { titulo, conteudo } = req.body
    
    if(!titulo || !conteudo) 
      return res.status(401).json({ error: 'Please, inform all data' })

    const data = this.factoryContent(titulo, userId, conteudo)

    try {
      const id = await this._topicoModel.createTopico(data)

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init4() {this.update = async (req, res) => {
    let { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { titulo, conteudo, aberto, ativo } = req.body

    const data = {
      titulo,
      conteudo,
      aberto: Boolean(aberto),
      ativo: Boolean(ativo)
    }

    const existsTopico = await this._topicoModel.existsTopico(Number(id_topico_comunidade))

    if(!existsTopico) return res.status(404).json({ error: 'Topic not Found' })

    const where = {
      id_topico_comunidade: Number(id_topico_comunidade),
      id_usuario: userId
    }

    try {
      await this._topicoModel.updateTopico(data, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}

   factoryContent(titulo, id_usuario, conteudo) {
    const data_publicacao = _nowDateUTC2.default.call(void 0, )
    const ativo = true
    const aberto = true
    
    return { titulo, id_usuario, conteudo, ativo, aberto, data_publicacao }
  }
}

exports. default = new TopicoController()