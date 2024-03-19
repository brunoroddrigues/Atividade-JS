"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _ConteudoModel = require('../../models/PublicationModel/ConteudoModel'); var _ConteudoModel2 = _interopRequireDefault(_ConteudoModel);
var _TagsConteudosModel = require('../../models/PublicationModel/TagsConteudosModel'); var _TagsConteudosModel2 = _interopRequireDefault(_TagsConteudosModel);
var _TagsModel = require('../../models/PublicationModel/TagsModel'); var _TagsModel2 = _interopRequireDefault(_TagsModel);

var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _nowDateUTC = require('../../utils/nowDateUTC'); var _nowDateUTC2 = _interopRequireDefault(_nowDateUTC);

var _ComentariosModel = require('../../models/PublicationModel/ComentariosModel'); var _ComentariosModel2 = _interopRequireDefault(_ComentariosModel);

class ConteudosController {constructor() { ConteudosController.prototype.__init.call(this);ConteudosController.prototype.__init2.call(this);ConteudosController.prototype.__init3.call(this);ConteudosController.prototype.__init4.call(this);ConteudosController.prototype.__init5.call(this);ConteudosController.prototype.__init6.call(this);ConteudosController.prototype.__init7.call(this);ConteudosController.prototype.__init8.call(this);ConteudosController.prototype.__init9.call(this);ConteudosController.prototype.__init10.call(this);ConteudosController.prototype.__init11.call(this);ConteudosController.prototype.__init12.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}
   __init2() {this._conteudoModel = new (0, _ConteudoModel2.default)()}
   __init3() {this._tagsConteudosModel = new (0, _TagsConteudosModel2.default)()}
   __init4() {this._tagsModel = new (0, _TagsModel2.default)()}
   __init5() {this._comentariosModel = new (0, _ComentariosModel2.default)()}

   __init6() {this.show = async (req, res) => {
    const { id_conteudo } = req.params
    const { onlyActive } = req.query
    let conteudo = null

    console.log(onlyActive);

    if(isNaN(Number(id_conteudo))) {
      return res.status(400).json({ error: 'Bad Request' })
    }

    if(onlyActive === 'false') {
      conteudo = await this._conteudoModel.showPublication2(Number(id_conteudo))
    } else {
      conteudo = await this._conteudoModel.showPublication(Number(id_conteudo))
    }


    if(!conteudo) return res.status(404).json({ error: 'Publication Not Found!'})

    return res.json(conteudo)
  }}

   __init7() {this.index = async (req, res) => {
    const { pages, order, tags, onlyActive, titulo, categoria, ferramenta, likes, ultimos } = req.query
    
    const tagString = String(tags)
    const tagsArray = tagString !== 'undefined' ? tagString.split(",") : []
    
    console.log(categoria);
    let conteudos;
    if(titulo != null){
      conteudos = await this._conteudoModel.indexConteudotitulo(titulo)
    }else if(categoria != null){
      conteudos = await this._conteudoModel.indexConteudoCategoria(Number(categoria))
    }else if(ferramenta != null){
      conteudos = await this._conteudoModel.indexConteudoFerramenta(Number(ferramenta))
    }else if(likes != null){
      conteudos = await this._conteudoModel.indexConteudoPorLike(Number(pages), String(order), tagsArray, this.onlyActive(String(onlyActive)))
    }else if(ultimos != null){
      conteudos = await this._conteudoModel.indexConteudoUltimos(Number(pages), String(order), tagsArray, this.onlyActive(String(onlyActive)))
  } else{
      conteudos = await this._conteudoModel.indexConteudo(Number(pages), String(order), tagsArray, this.onlyActive(String(onlyActive)))
    }
    // return publication and tags
    

    conteudos = conteudos.map(conteudo => {
      conteudo.publicacao.data_publicacao = _FormatDate2.default.call(void 0, conteudo.publicacao.data_publicacao)
      console.log(conteudo);
      return conteudo
    })
    

    return res.json(conteudos)
  }}

   __init8() {this.store = async (req, res) => {
    let { userId } = req.userSession
    const { titulo, descricao, imagem, conteudo, ativo, id_ferramenta } = req.body

    if(!titulo || !descricao || !imagem || !conteudo || !id_ferramenta) 
      return res.status(401).json({ error: 'Please, inform all data' })

    const user = await this._userModel.GetAccount(userId)

    const data = user.id_tipo === 1 ?
      this.factoryContent(titulo, imagem, descricao, conteudo, false, userId, Number(id_ferramenta)) :
      this.factoryContent(titulo, imagem, descricao, conteudo, Boolean(ativo), userId, Number(id_ferramenta)) 

    try {
      // for(let id_tag of tags) {
      //   const existsTag = await this._tagsModel.getTag(Number(id_tag))
        
      //   if(!existsTag) return res.status(404).json({ error: `Tag ${id_tag} not Found` })
      // }

      const id = await this._conteudoModel.createConteudo(data)

      // const tag = await this.addTags(id, tags)

      return user.id_tipo === 1 ? 
        res.send({ sucess: "Enviado para analise" }) : res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}

   __init9() {this.update = async (req, res) => {
    const { id_conteudo } = req.params
    let { titulo, imagem, descricao, conteudo, ativo, id_ferramenta } = req.body

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: "Content not found"})

    const data = {
      titulo, 
      imagem,
      descricao, 
      conteudo, 
      ativo: Boolean(ativo),
      id_ferramenta: Number(id_ferramenta)
    } 

    try {
    //   for(let id_tag of tags) {
    //     const existsTag = await this._tagsModel.getTag(Number(id_tag))
        
    //     if(!existsTag) return res.status(404).json({ error: `Tag ${id_tag} not Found` })
    //   }

      // await this._tagsConteudosModel.deleteTagsConteudos(Number(id_conteudo))
      // await this.addTags(Number(id_conteudo), tags)
      
      await this._conteudoModel.updateConteudos(data, Number(id_conteudo))

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }}

   __init10() {this.delete = async (req, res) => {
    const { id_conteudo } = req.params

    const existsConteudo = await this._conteudoModel.existsConteudo(Number(id_conteudo))

    if(!existsConteudo) return res.status(404).json({ error: "Content not found"})

    const where = {
      
      id_conteudo: Number(id_conteudo)
    }
    try {


      await this._comentariosModel.deleteComentario(where)
      await this._conteudoModel.deleteConteudos(Number(id_conteudo))

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }}
   __init11() {this.onlyActive = (active) => {
    return active === 'true'
  }}

   __init12() {this.addTags = async (id_conteudo, tags) => {
    const tag = await Promise.all(tags.map(async tag => {
      const data = { id_conteudo, id_tag: tag }

      this._tagsConteudosModel.createTagsConteudos(data)

      return tag
    }))

    return tag
  }}

   factoryContent(titulo, imagem, descricao, conteudo, ativo, id_usuario, id_ferramenta) {
    const data_publicacao = _nowDateUTC2.default.call(void 0, )
    const isAtivo = ativo ? 1 : 0
    
    return { titulo, imagem, descricao, conteudo, ativo: isAtivo, id_usuario, id_ferramenta, data_publicacao }
  }
}

exports. default = new ConteudosController()