"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SimpleCRUD = require('../SimpleCRUD'); var _SimpleCRUD2 = _interopRequireDefault(_SimpleCRUD);

class FerramentasModel extends _SimpleCRUD2.default {
  constructor () { super('ferramentas');FerramentasModel.prototype.__init.call(this);FerramentasModel.prototype.__init2.call(this);FerramentasModel.prototype.__init3.call(this);FerramentasModel.prototype.__init4.call(this);FerramentasModel.prototype.__init5.call(this); }

   __init() {this.existsFerramentas = async (descritivo) => {
    const ferramentas = await this.ReadWithWhereFirst({ descritivo: descritivo.trim() })

    return ferramentas
  }}

   __init2() {this.createFerramentas = async (data) => {
    const id = await this.Create(data)

    return id[0]
  }}

   __init3() {this.indexFerramentas = async () => {
    const ferramentas = await this.Read()

    return ferramentas
  }}

   __init4() {this.indexFerramentasId = async (id_ferramenta) => {
    const ferramentas = await this.ReadWithWhereFirst({ id_ferramenta })

    return ferramentas
  }}

   __init5() {this.updateFerramentas = async (data, id_ferramenta) => {
    await this.Update(data, { id_ferramenta })
  }}
}

exports. default = FerramentasModel