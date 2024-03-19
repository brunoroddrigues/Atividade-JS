"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);


class TagsConteudosModel extends _SimpleCRUD2.default {
  constructor () { super('tags_conteudos');TagsConteudosModel.prototype.__init.call(this);TagsConteudosModel.prototype.__init2.call(this);TagsConteudosModel.prototype.__init3.call(this); }

   __init() {this.createTagsConteudos = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init2() {this.updateTagsConteudos = async (data, id_tag_conteudo) => {
    await this.Update(data, { id_tag_conteudo })
  }}

   __init3() {this.deleteTagsConteudos = async (id_conteudo) => {
    await this.Delete({ id_conteudo })
  }}
}

exports. default = TagsConteudosModel