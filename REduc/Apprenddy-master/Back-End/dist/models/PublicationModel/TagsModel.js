"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class TagsModel extends _SimpleCRUD2.default {
  constructor () { super('tags');TagsModel.prototype.__init.call(this);TagsModel.prototype.__init2.call(this);TagsModel.prototype.__init3.call(this);TagsModel.prototype.__init4.call(this);TagsModel.prototype.__init5.call(this);TagsModel.prototype.__init6.call(this); }

   __init() {this.getTag = async (id_tag) => {
    const tag = await this.ReadWithWhereFirst({ id_tag })

    return tag  
  }}

   __init2() {this.existsTags = async (descritivo) => {
    const tags = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return tags
  }}

   __init3() {this.createTags = async (descritivo) => {
    const id = await this.Create({ descritivo: descritivo.trim() })

    return id[0]
  }}

   __init4() {this.indexTags = async (limit) => {
    const tags = await this.ReadWithLimit(limit)

    return tags
  }}

   __init5() {this.indexTagId = async (id_tag) => {
    const tags = await this.ReadWithWhereFirst({id_tag})

    return tags
  }}

   __init6() {this.updateTags = async (id_tag, descritivo) => {
    await this.Update({ descritivo: descritivo.trim() }, { id_tag })
  }}
}

exports. default = TagsModel