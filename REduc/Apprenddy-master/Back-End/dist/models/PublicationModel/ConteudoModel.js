"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _FormatDate = require('../../utils/FormatDate'); var _FormatDate2 = _interopRequireDefault(_FormatDate);
var _connection = require('../../database/connection'); var _connection2 = _interopRequireDefault(_connection);

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);


class ConteudoModel extends _SimpleCRUD2.default {
  constructor() {
    super("conteudos");ConteudoModel.prototype.__init.call(this);ConteudoModel.prototype.__init2.call(this);ConteudoModel.prototype.__init3.call(this);ConteudoModel.prototype.__init4.call(this);ConteudoModel.prototype.__init5.call(this);ConteudoModel.prototype.__init6.call(this);ConteudoModel.prototype.__init7.call(this);ConteudoModel.prototype.__init8.call(this);ConteudoModel.prototype.__init9.call(this);ConteudoModel.prototype.__init10.call(this);ConteudoModel.prototype.__init11.call(this);ConteudoModel.prototype.__init12.call(this);ConteudoModel.prototype.__init13.call(this);ConteudoModel.prototype.__init14.call(this);ConteudoModel.prototype.__init15.call(this);ConteudoModel.prototype.__init16.call(this);ConteudoModel.prototype.__init17.call(this);ConteudoModel.prototype.__init18.call(this);ConteudoModel.prototype.__init19.call(this);ConteudoModel.prototype.__init20.call(this);ConteudoModel.prototype.__init21.call(this);ConteudoModel.prototype.__init22.call(this);ConteudoModel.prototype.__init23.call(this);;
  }

   __init() {this._tags = []}

   __init2() {this.showPublication = async (id_conteudo) => {
    const getConteudo = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where({ 'conteudos.ativo': true, 'conteudos.id_conteudo': id_conteudo })
      .count("likes_conteudo.id_conteudo as likes")
      .select('conteudos.*')
      .select("usuarios.nome as usuario_nome")
      .first()

    if(!getConteudo.id_conteudo) return;

    const conteudo = await this.getTags(getConteudo)

    conteudo.publicacao.data_publicacao = _FormatDate2.default.call(void 0, conteudo.publicacao.data_publicacao)

    return conteudo
  }}

   __init3() {this.showPublication2 = async (id_conteudo) => {
    const getConteudo = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where({ 'conteudos.id_conteudo': id_conteudo })
      .count("likes_conteudo.id_conteudo as likes")
      .select('conteudos.*')
      .select("usuarios.nome as usuario_nome")
      .first()

    if(!getConteudo.id_conteudo) return;

    const conteudo = await this.getTags(getConteudo)

    conteudo.publicacao.data_publicacao = _FormatDate2.default.call(void 0, conteudo.publicacao.data_publicacao)

    return conteudo
  }}

  // public getUserPublications = async (id_usuario: number) => {
  //   const contents = await this.ReadReturnSelectWithWhere(
  //     this.selectContent(),
  //     { id_usuario, ativo: true }
  //   );

  //   const conteudo = await this.tagsConteudos(contents);

  //   return conteudo;
  // };
   __init4() {this.getUserPublications = async (id_usuario) => {
    const contents = await _connection2.default.call(void 0, "conteudos")
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo",
      ).innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta",
      )
      .where({
        "conteudos.id_usuario": id_usuario,
        "conteudos.ativo": true,
      })
      .select(this.selectContent2());

    const conteudo = await this.tagsConteudos(contents);
      console.log(conteudo)
    return conteudo;
  }}

   __init5() {this.getUserPublicationsLiked = async (id_usuario) => {
    console.log(id_usuario);
    const contents = await _connection2.default.call(void 0, "conteudos")
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo",
      ).innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta",
      )
      .where({
        "likes_conteudo.id_usuario": id_usuario,
        "conteudos.ativo": true,
      })
      .select(this.selectContent2());

    const conteudo = await this.tagsConteudos(contents);
      console.log(conteudo)
    return conteudo;
  }}

   __init6() {this.getUserPublication = async (id_conteudo) => {
    const publication = await this.ReadWithWhereFirst({
      id_conteudo,
      ativo: true,
    });

    const userModel = new (0, _SimpleCRUD2.default)("usuarios");

    const user = await userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user;
  }}

   __init7() {this.createConteudo = async (data) => {
    const id = await this.Create(data);

    return id[0];
  }}

   __init8() {this.existsConteudo = async (id_conteudo) => {
    const conteudo = await this.ReadWithWhereFirst({ id_conteudo });

    return conteudo;
  }}

   __init9() {this.indexConteudo = async (pages, order, tags, onlyActive) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta",
       
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where(this.onlyActive(onlyActive))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("conteudos.id_conteudo", 'desc')
      .limit(200)
      .offset((pages - 1) * 10);

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init10() {this.indexConteudoUltimos = async (pages, order, tags, onlyActive) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta",
       
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where(this.onlyActive(onlyActive))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("conteudos.id_conteudo", 'desc')
      .limit(8)
      .offset((pages - 1) * 10);

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init11() {this.indexConteudoPorLike = async (pages, order, tags, onlyActive) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta",
       
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where(this.onlyActive(onlyActive))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("likes", 'desc')
      .limit(4)
      .offset((pages - 1) * 10);

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init12() {this.indexConteudotitulo = async (titulo, onlyActive) => {
    

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta"
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where( 'titulo', 'like', `%${titulo}%`).andWhere(this.onlyActive(true))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("likes")
      .limit(200)
      

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init13() {this.indexConteudoCategoria = async (categoria) => {
    

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta"
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where( 'ferramentas.id_categoria', categoria).andWhere(this.onlyActive(true))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("likes")
      .limit(200)
      

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init14() {this.whereTags = (table) => {
    console.log(this._tags)
    if(this._tags.length > 0){
      return table.whereIn('tags_conteudos.id_tag', this._tags)
    }

    return;
  }}

   __init15() {this.indexConteudoFerramenta = async (ferramenta) => {
    

    const conteudos = await _connection2.default.call(void 0, "conteudos")
      .innerJoin("usuarios", "usuarios.id_usuario", "conteudos.id_usuario")
      .leftJoin("tags_conteudos", "tags_conteudos.id_conteudo", "conteudos.id_conteudo")
      .innerJoin(
        "ferramentas",
        "ferramentas.id_ferramenta",
        "conteudos.id_ferramenta"
      )
      .leftJoin(
        "likes_conteudo",
        "likes_conteudo.id_conteudo",
        "conteudos.id_conteudo"
      )
      .where( 'ferramentas.id_ferramenta', ferramenta).andWhere(this.onlyActive(true))
      .modify(this.whereTags)
      .select(this.selectContent2())
      .select([
        "usuarios.nome as usuario_nome",
        "ferramentas.descritivo as ferramenta_descritivo",
        "conteudos.ativo",
      ])
      .count("likes_conteudo.id_conteudo as likes")
      .groupBy("conteudos.id_conteudo")
      .orderBy("likes")
      .limit(200)
      

    const conteudo = await this.tagsConteudos(conteudos);

    return conteudo;
  }}

   __init16() {this.whereTags = (table) => {
    console.log(this._tags)
    if(this._tags.length > 0){
      return table.whereIn('tags_conteudos.id_tag', this._tags)
    }

    return;
  }}

   __init17() {this.onlyActive = (active) => {
    return active ? { ativo : true } : { }
  }}

   __init18() {this.tagsConteudos = async (conteudos) => {
    const tags = await Promise.all(
      conteudos.map(async (conteudo) => await this.getTags(conteudo))
    );

    return tags;
  }}

   __init19() {this.getTags = async (conteudo) => {
    const tag = await _connection2.default.call(void 0, "tags_conteudos")
      .innerJoin("tags", "tags.id_tag", "tags_conteudos.id_tag")
      .where("id_conteudo", conteudo.id_conteudo)
      .select(["tags_conteudos.id_tag_conteudo", "tags.*"]);

    return { publicacao: conteudo, tag };
  }}

   __init20() {this.updateConteudos = async (data, id_conteudo) => {
    await this.Update(data, { id_conteudo });
  }}

   __init21() {this.deleteConteudos = async (id_conteudo) => {
    await this.Delete({ id_conteudo });
  }}

   __init22() {this.selectContent = () => {
    return [
      "conteudos.id_conteudo",
      "conteudos.titulo",
      "conteudos.imagem",
      "conteudos.descricao",
      "conteudos.data_publicacao",
      "conteudos.id_usuario",
      "conteudos.id_ferramenta",
      
    ];
  }}
   __init23() {this.selectContent2 = () => {
    return [
      "conteudos.id_conteudo",
      "conteudos.titulo",
      "conteudos.imagem",
      "conteudos.descricao",
      "conteudos.data_publicacao",
      "conteudos.id_usuario",
      "conteudos.id_ferramenta",
      "ferramentas.icone",
      "ferramentas.descritivo",
    ];
  }}
}

exports. default = ConteudoModel;
