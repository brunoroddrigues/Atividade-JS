import FormatDate from "../../utils/FormatDate";
import knex from "../../database/connection";

import SimpleCRUD from "../SimpleCRUD";
import { QueryBuilder } from "knex";

class ConteudoModel extends SimpleCRUD {
  constructor() {
    super("conteudos");
  }

  private _tags: Array<string> = [];

  public showPublication = async (id_conteudo: number) => {
    const getConteudo = await knex("conteudos")
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

    conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)

    return conteudo
  }

  public showPublication2 = async (id_conteudo: number) => {
    const getConteudo = await knex("conteudos")
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

    conteudo.publicacao.data_publicacao = FormatDate(conteudo.publicacao.data_publicacao)

    return conteudo
  }

  // public getUserPublications = async (id_usuario: number) => {
  //   const contents = await this.ReadReturnSelectWithWhere(
  //     this.selectContent(),
  //     { id_usuario, ativo: true }
  //   );

  //   const conteudo = await this.tagsConteudos(contents);

  //   return conteudo;
  // };
  public getUserPublications = async (id_usuario: number) => {
    const contents = await knex("conteudos")
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
  };

  public getUserPublicationsLiked = async (id_usuario: number) => {
    console.log(id_usuario);
    const contents = await knex("conteudos")
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
  };

  public getUserPublication = async (id_conteudo: number) => {
    const publication = await this.ReadWithWhereFirst({
      id_conteudo,
      ativo: true,
    });

    const userModel = new SimpleCRUD("usuarios");

    const user = await userModel.ReadReturnSelectWithWhereFirst(
      ["id_usuario"],
      { id_usuario: publication.id_usuario }
    );

    return user;
  };

  public createConteudo = async (data: object) => {
    const id = await this.Create(data);

    return id[0];
  };

  public existsConteudo = async (id_conteudo: number) => {
    const conteudo = await this.ReadWithWhereFirst({ id_conteudo });

    return conteudo;
  };

  public indexConteudo = async (pages: number, order: string, tags: Array<string>, onlyActive?: boolean) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await knex("conteudos")
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
  };

  public indexConteudoUltimos = async (pages: number, order: string, tags: Array<string>, onlyActive?: boolean) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await knex("conteudos")
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
  };

  public indexConteudoPorLike = async (pages: number, order: string, tags: Array<string>, onlyActive?: boolean) => {
    
    this._tags = tags
    
    if (!pages) {
      pages = 1;
    }

    if (!order) {
      order = "asc";
    }

    const conteudos = await knex("conteudos")
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
  };

  public indexConteudotitulo = async (titulo, onlyActive?: boolean) => {
    

    const conteudos = await knex("conteudos")
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
  };

  public indexConteudoCategoria = async (categoria: number) => {
    

    const conteudos = await knex("conteudos")
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
  };

  private whereTags = (table: QueryBuilder) => {
    console.log(this._tags)
    if(this._tags.length > 0){
      return table.whereIn('tags_conteudos.id_tag', this._tags)
    }

    return;
  }

  public indexConteudoFerramenta = async (ferramenta: number) => {
    

    const conteudos = await knex("conteudos")
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
  };

  private whereTags = (table: QueryBuilder) => {
    console.log(this._tags)
    if(this._tags.length > 0){
      return table.whereIn('tags_conteudos.id_tag', this._tags)
    }

    return;
  }

  private onlyActive = (active: boolean) => {
    return active ? { ativo : true } : { }
  }

  private tagsConteudos = async (conteudos: Array<object>) => {
    const tags = await Promise.all(
      conteudos.map(async (conteudo) => await this.getTags(conteudo))
    );

    return tags;
  };

  private getTags = async (conteudo: any) => {
    const tag = await knex("tags_conteudos")
      .innerJoin("tags", "tags.id_tag", "tags_conteudos.id_tag")
      .where("id_conteudo", conteudo.id_conteudo)
      .select(["tags_conteudos.id_tag_conteudo", "tags.*"]);

    return { publicacao: conteudo, tag };
  };

  public updateConteudos = async (data: object, id_conteudo: number) => {
    await this.Update(data, { id_conteudo });
  };

  public deleteConteudos = async (id_conteudo: number) => {
    await this.Delete({ id_conteudo });
  };

  private selectContent = () => {
    return [
      "conteudos.id_conteudo",
      "conteudos.titulo",
      "conteudos.imagem",
      "conteudos.descricao",
      "conteudos.data_publicacao",
      "conteudos.id_usuario",
      "conteudos.id_ferramenta",
      
    ];
  };
  private selectContent2 = () => {
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
  };
}

export default ConteudoModel;
