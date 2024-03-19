"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class CategoriaModel extends _SimpleCRUD2.default {
  constructor () { super('categorias');CategoriaModel.prototype.__init.call(this);CategoriaModel.prototype.__init2.call(this);CategoriaModel.prototype.__init3.call(this);CategoriaModel.prototype.__init4.call(this);CategoriaModel.prototype.__init5.call(this); }

   __init() {this.existsCategoria = async (descritivo) => {
    const categoria = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return categoria
  }}

   __init2() {this.createCategoria = async (descritivo) => {
    const id = await this.Create({ descritivo: descritivo.trim() })

    return id[0]
  }}

   __init3() {this.indexCategoria = async (limit) => {
    const categorias = await this.ReadWithLimit(limit)

    return categorias
  }}

   __init4() {this.indexCategoriaId = async (id_categoria) => {
    const categorias = await this.ReadWithWhereFirst({ id_categoria })

    return categorias
  }}

   __init5() {this.updateCategoria = async (id_categoria, descritivo) => {
    await this.Update({ descritivo: descritivo.trim() }, { id_categoria })
  }}
}

exports. default = CategoriaModel