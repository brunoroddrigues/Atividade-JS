import { Request, Response } from 'express'

import UserModel from '../../models/UsersModel/UserModel'
import ConteudoModel from '../../models/PublicationModel/ConteudoModel'
import TagsConteudosModel from '../../models/PublicationModel/TagsConteudosModel'
import TagsModel from '../../models/PublicationModel/TagsModel'

import FormatDate from '../../utils/FormatDate'
import nowDateUTC from '../../utils/nowDateUTC'
import { ta } from 'date-fns/locale'
import CommentariosModel from '../../models/PublicationModel/ComentariosModel'

class ConteudosController {
  private _userModel = new UserModel()
  private _conteudoModel = new ConteudoModel()
  private _tagsConteudosModel = new TagsConteudosModel()
  private _tagsModel = new TagsModel()
  private _comentariosModel = new CommentariosModel();

  public show = async (req: Request, res: Response) => {
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
  }

  public index = async (req: Request, res: Response) => {
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
      conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)
      console.log(conteudo);
      return conteudo
    })
    

    return res.json(conteudos)
  }

  public store = async (req: Request, res: Response) => {
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
  }

  public update = async (req: Request, res: Response) => {
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
  }

  public delete = async (req: Request, res: Response) => {
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
  }
  private onlyActive = (active: string): boolean => {
    return active === 'true'
  }

  private addTags = async (id_conteudo: number, tags: Array<number>) => {
    const tag = await Promise.all(tags.map(async tag => {
      const data = { id_conteudo, id_tag: tag }

      this._tagsConteudosModel.createTagsConteudos(data)

      return tag
    }))

    return tag
  }

  private factoryContent(titulo: string, imagem: string, descricao: string, conteudo: string, ativo: boolean, id_usuario: number, id_ferramenta: number) {
    const data_publicacao = nowDateUTC()
    const isAtivo = ativo ? 1 : 0
    
    return { titulo, imagem, descricao, conteudo, ativo: isAtivo, id_usuario, id_ferramenta, data_publicacao }
  }
}

export default new ConteudosController()